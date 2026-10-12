using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using AdvocateApi.Data;

namespace AdvocateApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DatabaseController : ControllerBase
{
    private readonly AppDbContext _context;

    public DatabaseController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("status")]
    public async Task<IActionResult> GetStatus()
    {
        try
        {
            var canConnect = await _context.Database.CanConnectAsync();
            if (!canConnect)
            {
                return StatusCode(500, new { connected = false, message = "Could not connect to PostgreSQL" });
            }

            var casesCount = await _context.Cases.CountAsync();
            var clientsCount = await _context.Clients.CountAsync();
            var apptsCount = await _context.Appointments.CountAsync();
            var tasksCount = await _context.Tasks.CountAsync();
            var recordsCount = await _context.Records.CountAsync();
            var usersCount = await _context.Users.CountAsync();

            string dbName = "";
            string pgVersion = "";
            using (var conn = (NpgsqlConnection)_context.Database.GetDbConnection())
            {
                await conn.OpenAsync();
                using var cmd = new NpgsqlCommand("SELECT current_database(), version();", conn);
                using var reader = await cmd.ExecuteReaderAsync();
                if (await reader.ReadAsync())
                {
                    dbName = reader.GetString(0);
                    pgVersion = reader.GetString(1);
                }
            }

            return Ok(new
            {
                connected = true,
                database = dbName,
                schema = "AWS",
                serverVersion = pgVersion,
                timestamp = DateTime.UtcNow,
                counts = new
                {
                    cases = casesCount,
                    clients = clientsCount,
                    appointments = apptsCount,
                    tasks = tasksCount,
                    records = recordsCount,
                    users = usersCount
                }
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                connected = false,
                error = ex.Message,
                details = ex.InnerException?.Message
            });
        }
    }
}
