using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using AdvocateApi.Models;

namespace AdvocateApi.Data;

public static class DbInitializer
{
    public static async Task InitializeAsync(AppDbContext context, IWebHostEnvironment env, ILogger logger)
    {
        try
        {
            var conn = (NpgsqlConnection)context.Database.GetDbConnection();
            if (conn.State != System.Data.ConnectionState.Open)
            {
                await conn.OpenAsync();
            }

            // 1. Ensure schema AWS exists
            using (var schemaCmd = new NpgsqlCommand("CREATE SCHEMA IF NOT EXISTS \"AWS\";", conn))
            {
                await schemaCmd.ExecuteNonQueryAsync();
            }

            // 2. Check if table Cases exists in AWS schema
            bool tablesExist;
            using (var checkCmd = new NpgsqlCommand("SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'AWS' AND table_name = 'Cases');", conn))
            {
                tablesExist = (bool)(await checkCmd.ExecuteScalarAsync() ?? false);
            }

            if (!tablesExist)
            {
                logger.LogInformation("Creating tables in AWS schema...");
                var createScript = context.Database.GenerateCreateScript();
                using (var scriptCmd = new NpgsqlCommand(createScript, conn))
                {
                    await scriptCmd.ExecuteNonQueryAsync();
                }
                logger.LogInformation("Tables created successfully in AWS schema.");
            }
            else
            {
                // Ensure all columns exist for existing tables
                var migrationScript = @"
                    ALTER TABLE ""AWS"".""Tasks"" ADD COLUMN IF NOT EXISTS ""AssignedUser"" text;
                    ALTER TABLE ""AWS"".""Tasks"" ADD COLUMN IF NOT EXISTS ""CaseId"" text;
                    ALTER TABLE ""AWS"".""Appointments"" ADD COLUMN IF NOT EXISTS ""Location"" text;
                    ALTER TABLE ""AWS"".""Appointments"" ADD COLUMN IF NOT EXISTS ""Venue"" text;
                    ALTER TABLE ""AWS"".""Appointments"" ADD COLUMN IF NOT EXISTS ""Company"" text;
                    ALTER TABLE ""AWS"".""Appointments"" ADD COLUMN IF NOT EXISTS ""VideoPlatform"" text;
                    ALTER TABLE ""AWS"".""Appointments"" ADD COLUMN IF NOT EXISTS ""VideoLink"" text;
                    ALTER TABLE ""AWS"".""Appointments"" ADD COLUMN IF NOT EXISTS ""Phone"" text;
                    ALTER TABLE ""AWS"".""Clients"" ADD COLUMN IF NOT EXISTS ""Avatar"" text;
                    ALTER TABLE ""AWS"".""Clients"" ADD COLUMN IF NOT EXISTS ""Address"" text;
                    ALTER TABLE ""AWS"".""Clients"" ADD COLUMN IF NOT EXISTS ""Status"" text;
                    ALTER TABLE ""AWS"".""Clients"" ADD COLUMN IF NOT EXISTS ""Tier"" text;
                    ALTER TABLE ""AWS"".""Clients"" ADD COLUMN IF NOT EXISTS ""LinkedCases"" jsonb;
                    ALTER TABLE ""AWS"".""Clients"" ADD COLUMN IF NOT EXISTS ""LinkedRecords"" jsonb;
                    ALTER TABLE ""AWS"".""Clients"" ADD COLUMN IF NOT EXISTS ""Notes"" jsonb;
                    ALTER TABLE ""AWS"".""Clients"" ADD COLUMN IF NOT EXISTS ""Documents"" jsonb;
                    ALTER TABLE ""AWS"".""Clients"" ADD COLUMN IF NOT EXISTS ""BillingBalance"" text;
                    ALTER TABLE ""AWS"".""Clients"" ADD COLUMN IF NOT EXISTS ""PaymentStatus"" text;
                    ALTER TABLE ""AWS"".""Clients"" ADD COLUMN IF NOT EXISTS ""Pan"" text;
                    ALTER TABLE ""AWS"".""Clients"" ADD COLUMN IF NOT EXISTS ""Gstin"" text;
                ";
                using (var migCmd = new NpgsqlCommand(migrationScript, conn))
                {
                    await migCmd.ExecuteNonQueryAsync();
                }
            }

            // 3. Seed initial data if empty (check Users table so user deletions of cases are preserved)
            if (!tablesExist || !await context.Users.AnyAsync())
            {
                logger.LogInformation("Database tables are empty. Seeding initial data into AWS schema...");

                var seedFilePath = Path.Combine(env.ContentRootPath, "seedData.json");
                if (File.Exists(seedFilePath))
                {
                    var json = await File.ReadAllTextAsync(seedFilePath);
                    using var doc = JsonDocument.Parse(json);
                    var root = doc.RootElement;

                    var jsonOptions = new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true,
                        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                    };

                    if (root.TryGetProperty("cases", out var casesEl))
                    {
                        var cases = JsonSerializer.Deserialize<List<CaseItem>>(casesEl.GetRawText(), jsonOptions);
                        if (cases != null) context.Cases.AddRange(cases);
                    }

                    if (root.TryGetProperty("clients", out var clientsEl))
                    {
                        var clients = JsonSerializer.Deserialize<List<ClientItem>>(clientsEl.GetRawText(), jsonOptions);
                        if (clients != null) context.Clients.AddRange(clients);
                    }

                    if (root.TryGetProperty("appointments", out var apptsEl))
                    {
                        var appts = JsonSerializer.Deserialize<List<AppointmentItem>>(apptsEl.GetRawText(), jsonOptions);
                        if (appts != null) context.Appointments.AddRange(appts);
                    }

                    if (root.TryGetProperty("tasks", out var tasksEl))
                    {
                        var tasks = JsonSerializer.Deserialize<List<TaskItem>>(tasksEl.GetRawText(), jsonOptions);
                        if (tasks != null) context.Tasks.AddRange(tasks);
                    }

                    if (root.TryGetProperty("records", out var recordsEl))
                    {
                        var records = JsonSerializer.Deserialize<List<RecordItem>>(recordsEl.GetRawText(), jsonOptions);
                        if (records != null) context.Records.AddRange(records);
                    }

                    if (root.TryGetProperty("notifications", out var notifsEl))
                    {
                        var notifs = JsonSerializer.Deserialize<List<NotificationItem>>(notifsEl.GetRawText(), jsonOptions);
                        if (notifs != null) context.Notifications.AddRange(notifs);
                    }

                    if (root.TryGetProperty("activities", out var actsEl))
                    {
                        var acts = JsonSerializer.Deserialize<List<ActivityItem>>(actsEl.GetRawText(), jsonOptions);
                        if (acts != null) context.Activities.AddRange(acts);
                    }

                    if (root.TryGetProperty("users", out var usersEl))
                    {
                        var users = JsonSerializer.Deserialize<List<UserItem>>(usersEl.GetRawText(), jsonOptions);
                        if (users != null) context.Users.AddRange(users);
                    }

                    if (root.TryGetProperty("rbacMatrix", out var rbacEl))
                    {
                        foreach (var prop in rbacEl.EnumerateObject())
                        {
                            var roleItem = JsonSerializer.Deserialize<RbacRoleItem>(prop.Value.GetRawText(), jsonOptions);
                            if (roleItem != null)
                            {
                                roleItem.RoleKey = prop.Name;
                                context.RbacRoles.Add(roleItem);
                            }
                        }
                    }

                    await context.SaveChangesAsync();
                    logger.LogInformation("Database seeded successfully into AWS schema!");
                }
                else
                {
                    logger.LogWarning("Seed file {SeedFile} not found.", seedFilePath);
                }
            }
            else
            {
                logger.LogInformation("Database already contains data in AWS schema.");
            }
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "An error occurred while initializing the database.");
            throw;
        }
    }
}
