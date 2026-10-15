using System.Text.Json;
using AdvocateApi.Controllers;
using AdvocateApi.Data;
using AdvocateApi.Models;
using Xunit;

namespace AdvocateBackend.Tests;

public class JsonPersistenceTests : IDisposable
{
    private readonly string _testDir;
    private readonly string _seedFilePath;

    public JsonPersistenceTests()
    {
        _testDir = Path.Combine(Path.GetTempPath(), "AdvocateBackendTests_" + Guid.NewGuid().ToString("N"));
        Directory.CreateDirectory(_testDir);

        // Create a minimal valid seedData.json for testing
        _seedFilePath = Path.Combine(_testDir, "seedData.json");
        var seedData = new
        {
            cases = new[]
            {
                new { id = "case_seed_1", title = "Initial Seed Case", court = "Madras High Court", status = "Active" }
            },
            clients = new[]
            {
                new { id = "cli_seed_1", name = "Initial Seed Client", email = "client@example.com", phone = "1234567890" }
            },
            appointments = new[]
            {
                new { id = "appt_seed_1", clientName = "Initial Seed Client", date = "2026-06-20", time = "10:00 AM", status = "Upcoming" }
            },
            tasks = new[]
            {
                new { id = "task_seed_1", title = "Initial Task", caseId = "case_seed_1", status = "todo" }
            },
            records = new[]
            {
                new { id = "rec_seed_1", name = "Initial Record", status = "Active" }
            },
            notifications = new[]
            {
                new { id = "not_seed_1", title = "Initial Notification", message = "System ready" }
            },
            activities = new[]
            {
                new { id = "act_seed_1", user = "System", action = "Initialized", target = "App" }
            },
            users = new[]
            {
                new { id = "usr_seed_1", name = "Advocate Test", role = "admin", email = "test@advocate.com" }
            },
            rbacMatrix = new Dictionary<string, object>
            {
                ["admin"] = new
                {
                    label = "Admin",
                    avatar = "AD",
                    color = "#4f46e5",
                    permissions = new Dictionary<string, bool> { ["read"] = true, ["write"] = true }
                }
            }
        };
        File.WriteAllText(_seedFilePath, JsonSerializer.Serialize(seedData));
    }

    public void Dispose()
    {
        try
        {
            if (Directory.Exists(_testDir))
            {
                Directory.Delete(_testDir, recursive: true);
            }
        }
        catch
        {
            // Ignore test cleanup error
        }
    }

    [Fact]
    public void Test_InitialStartup_CreatesPersistentFileFromSeedData_WithoutModifyingSeed()
    {
        var persistentPath = Path.Combine(_testDir, "data", "advocate-data.json");
        var originalSeedJson = File.ReadAllText(_seedFilePath);

        var store = new InMemoryDataStore();
        store.Initialize(_testDir, overridePath: persistentPath);

        Assert.True(File.Exists(persistentPath), "Persistent file should be created on initial startup.");
        Assert.Equal(1, store.CasesCount);
        Assert.NotNull(store.GetCase("case_seed_1"));

        // Ensure original seed file was NOT overwritten
        var currentSeedJson = File.ReadAllText(_seedFilePath);
        Assert.Equal(originalSeedJson, currentSeedJson);
    }

    [Fact]
    public void Test_CreateUpdateDelete_PersistsToDiskImmediately()
    {
        var persistentPath = Path.Combine(_testDir, "advocate-data.json");
        var store = new InMemoryDataStore();
        store.Initialize(_testDir, overridePath: persistentPath);

        // CREATE
        var newCase = new CaseItem
        {
            Id = "case_new_99",
            Title = "High Profile Corporate Merger",
            Court = "Supreme Court",
            Status = "Active"
        };
        store.AddCase(newCase);

        // Verify disk contents immediately contain the newly added case
        var jsonAfterCreate = File.ReadAllText(persistentPath);
        Assert.Contains("case_new_99", jsonAfterCreate);
        Assert.Contains("High Profile Corporate Merger", jsonAfterCreate);

        // UPDATE
        newCase.Title = "Updated High Profile Merger";
        store.UpdateCase(newCase.Id, newCase);

        var jsonAfterUpdate = File.ReadAllText(persistentPath);
        Assert.Contains("Updated High Profile Merger", jsonAfterUpdate);

        // DELETE
        var deleted = store.DeleteCase("case_new_99");
        Assert.True(deleted);

        var jsonAfterDelete = File.ReadAllText(persistentPath);
        Assert.DoesNotContain("case_new_99", jsonAfterDelete);
    }

    [Fact]
    public void Test_ApplicationRestart_PreservesRuntimeChanges()
    {
        var persistentPath = Path.Combine(_testDir, "advocate-data.json");

        // 1. Run First Instance (Service Lifecycle 1)
        var store1 = new InMemoryDataStore();
        store1.Initialize(_testDir, overridePath: persistentPath);

        store1.AddCase(new CaseItem
        {
            Id = "case_runtime_123",
            Title = "Arbitration Matter 2026",
            Court = "Madras High Court",
            Status = "Pending"
        });

        store1.AddClient(new ClientItem
        {
            Id = "cli_runtime_456",
            Name = "Acme Corp",
            Email = "acme@example.com"
        });

        store1.AddAppointment(new AppointmentItem
        {
            Id = "appt_runtime_789",
            ClientName = "Acme Corp",
            Date = "2026-08-15",
            Time = "02:30 PM",
            Venue = "Room 3"
        });

        store1.AddTask(new TaskItem
        {
            Id = "task_runtime_101",
            Title = "File Written Submissions",
            CaseId = "case_runtime_123",
            Status = "in_progress"
        });

        // 2. Simulate Application / systemd Service Restart (Service Lifecycle 2)
        // Create completely new InMemoryDataStore instance pointing to the same persistent path
        var store2 = new InMemoryDataStore();
        store2.Initialize(_testDir, overridePath: persistentPath);

        // Assert all changes survived the restart
        var reloadedCase = store2.GetCase("case_runtime_123");
        Assert.NotNull(reloadedCase);
        Assert.Equal("Arbitration Matter 2026", reloadedCase.Title);

        var reloadedClient = store2.GetClient("cli_runtime_456");
        Assert.NotNull(reloadedClient);
        Assert.Equal("Acme Corp", reloadedClient.Name);

        var reloadedAppt = store2.GetAppointment("appt_runtime_789");
        Assert.NotNull(reloadedAppt);
        Assert.Equal("02:30 PM", reloadedAppt.Time);

        var reloadedTask = store2.GetTask("task_runtime_101");
        Assert.NotNull(reloadedTask);
        Assert.Equal("File Written Submissions", reloadedTask.Title);
    }

    [Fact]
    public void Test_CorruptedJsonFile_CreatesBackupAndRecoversSafely()
    {
        var persistentPath = Path.Combine(_testDir, "corrupted-data.json");

        // Write corrupt JSON
        File.WriteAllText(persistentPath, "{ this is not valid JSON !!! invalid content }");

        var store = new InMemoryDataStore();
        store.Initialize(_testDir, overridePath: persistentPath);

        // Verify fallback to seed data succeeded
        Assert.Equal(1, store.CasesCount);
        Assert.NotNull(store.GetCase("case_seed_1"));

        // Verify corrupted file was backed up with .bak extension
        var backupFiles = Directory.GetFiles(_testDir, "*.bak");
        Assert.NotEmpty(backupFiles);

        // Verify new persistent file was safely created with valid JSON
        var recoveredJson = File.ReadAllText(persistentPath);
        Assert.Contains("case_seed_1", recoveredJson);
    }

    [Fact]
    public void Test_DeleteCase_UnlinksFromClientsAndTasks_AndPersists()
    {
        var persistentPath = Path.Combine(_testDir, "advocate-data.json");
        var store = new InMemoryDataStore();
        store.Initialize(_testDir, overridePath: persistentPath);

        // Add client linked to case
        var client = new ClientItem
        {
            Id = "cli_linked_1",
            Name = "Linked Client",
            LinkedCases = new List<string> { "case_to_delete", "other_case" }
        };
        store.AddClient(client);

        // Add task linked to case
        var task = new TaskItem
        {
            Id = "task_linked_1",
            Title = "Task for case",
            CaseId = "case_to_delete"
        };
        store.AddTask(task);

        // Add the case
        store.AddCase(new CaseItem { Id = "case_to_delete", Title = "Case to Delete" });

        // Delete the case
        store.DeleteCase("case_to_delete");

        // Simulate reload to verify persisted unlinking
        var storeReloaded = new InMemoryDataStore();
        storeReloaded.Initialize(_testDir, overridePath: persistentPath);

        var updatedClient = storeReloaded.GetClient("cli_linked_1");
        Assert.NotNull(updatedClient);
        Assert.DoesNotContain("case_to_delete", updatedClient.LinkedCases!);
        Assert.Contains("other_case", updatedClient.LinkedCases!);

        var updatedTask = storeReloaded.GetTask("task_linked_1");
        Assert.NotNull(updatedTask);
        Assert.Null(updatedTask.CaseId);
    }

    [Fact]
    public void Test_RbacMatrix_BatchUpdate_PersistsToDisk()
    {
        var persistentPath = Path.Combine(_testDir, "advocate-data.json");
        var store = new InMemoryDataStore();
        store.Initialize(_testDir, overridePath: persistentPath);

        var updateMatrix = new Dictionary<string, RbacRoleDto>
        {
            ["paralegal"] = new RbacRoleDto
            {
                Label = "Paralegal Assistant",
                Avatar = "PA",
                Color = "#10b981",
                Permissions = new Dictionary<string, bool> { ["read"] = true, ["addCase"] = false }
            }
        };

        store.UpdateRbacMatrix(updateMatrix);

        // Verify across reload
        var store2 = new InMemoryDataStore();
        store2.Initialize(_testDir, overridePath: persistentPath);

        var role = store2.GetRbacRole("paralegal");
        Assert.NotNull(role);
        Assert.Equal("Paralegal Assistant", role.Label);
        Assert.True(role.Permissions["read"]);
        Assert.False(role.Permissions["addCase"]);
    }

    [Fact]
    public void Test_ResolveDataFilePath_HandlesDirectoryAndFilePaths()
    {
        var contentRoot = @"/var/www/advocate-backend";

        // When given directory path ending with separator
        var dirResult = InMemoryDataStore.ResolveDataFilePath(@"/var/lib/advocate-data/", contentRoot);
        Assert.EndsWith("advocate-data.json", dirResult);

        // When given explicit file path
        var fileResult = InMemoryDataStore.ResolveDataFilePath(@"/var/lib/advocate-data/custom-store.json", contentRoot);
        Assert.Equal(@"/var/lib/advocate-data/custom-store.json", fileResult);

        // When null or empty
        var defaultResult = InMemoryDataStore.ResolveDataFilePath(null, contentRoot);
        Assert.Equal(Path.Combine(contentRoot, "data", "advocate-data.json"), defaultResult);
    }
}
