using System.Collections.Concurrent;
using System.Text;
using System.Text.Json;
using AdvocateApi.Controllers;
using AdvocateApi.Models;

namespace AdvocateApi.Data;

public class InMemoryDataStore
{
    private readonly ConcurrentDictionary<string, CaseItem> _cases = new();
    private readonly ConcurrentDictionary<string, ClientItem> _clients = new();
    private readonly ConcurrentDictionary<string, AppointmentItem> _appointments = new();
    private readonly ConcurrentDictionary<string, TaskItem> _tasks = new();
    private readonly ConcurrentDictionary<string, RecordItem> _records = new();
    private readonly ConcurrentDictionary<string, NotificationItem> _notifications = new();
    private readonly List<ActivityItem> _activities = new();
    private readonly object _activityLock = new();
    private readonly ConcurrentDictionary<string, UserItem> _users = new();
    private readonly ConcurrentDictionary<string, RbacRoleItem> _rbacRoles = new();

    private readonly object _fileLock = new();
    private string _dataFilePath = string.Empty;
    private ILogger? _logger;

    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true,
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        WriteIndented = true
    };

    public string DataFilePath => _dataFilePath;
    public int CasesCount => _cases.Count;
    public int ClientsCount => _clients.Count;
    public int AppointmentsCount => _appointments.Count;
    public int TasksCount => _tasks.Count;
    public int RecordsCount => _records.Count;
    public int UsersCount => _users.Count;

    public static string ResolveDataFilePath(string? configuredPath, string contentRootPath)
    {
        if (!string.IsNullOrWhiteSpace(configuredPath))
        {
            var trimmed = configuredPath.Trim();
            if (trimmed.EndsWith(Path.DirectorySeparatorChar.ToString()) ||
                trimmed.EndsWith(Path.AltDirectorySeparatorChar.ToString()) ||
                Directory.Exists(trimmed) ||
                !Path.HasExtension(trimmed))
            {
                return Path.Combine(trimmed, "advocate-data.json");
            }
            return trimmed;
        }

        // Default path for local development: <contentRoot>/data/advocate-data.json
        return Path.Combine(contentRootPath, "data", "advocate-data.json");
    }

    public void Initialize(string contentRootPath, IConfiguration? configuration = null, ILogger? logger = null, string? overridePath = null)
    {
        _logger = logger;

        string? configuredPath = overridePath;
        if (string.IsNullOrWhiteSpace(configuredPath))
        {
            configuredPath = Environment.GetEnvironmentVariable("ADVOCATE_DATA_PATH");
        }
        if (string.IsNullOrWhiteSpace(configuredPath) && configuration != null)
        {
            configuredPath = configuration["ADVOCATE_DATA_PATH"]
                             ?? configuration["AdvocateDataPath"]
                             ?? configuration["DataStore:Path"];
        }

        _dataFilePath = ResolveDataFilePath(configuredPath, contentRootPath);
        _logger?.LogInformation("Configured persistent JSON data path: {DataFilePath}", _dataFilePath);

        var directory = Path.GetDirectoryName(_dataFilePath);
        if (!string.IsNullOrEmpty(directory) && !Directory.Exists(directory))
        {
            try
            {
                Directory.CreateDirectory(directory);
                _logger?.LogInformation("Created storage directory: {Directory}", directory);
            }
            catch (Exception ex)
            {
                _logger?.LogError(ex, "Failed to create storage directory '{Directory}'. Ensure systemd service user has write permissions.", directory);
                throw new InvalidOperationException($"Cannot create storage directory '{directory}'. Check permissions: {ex.Message}", ex);
            }
        }

        // 1. Try loading persistent file if it exists
        if (File.Exists(_dataFilePath))
        {
            try
            {
                _logger?.LogInformation("Loading persistent data from {Path}...", _dataFilePath);
                var json = File.ReadAllText(_dataFilePath);
                if (!string.IsNullOrWhiteSpace(json))
                {
                    var snapshot = JsonSerializer.Deserialize<AdvocateDataSnapshot>(json, JsonOptions);
                    if (snapshot != null)
                    {
                        LoadFromSnapshot(snapshot);
                        _logger?.LogInformation("Successfully loaded persistent data: {Cases} cases, {Clients} clients, {Users} users.",
                            _cases.Count, _clients.Count, _users.Count);
                        return;
                    }
                }
                _logger?.LogWarning("Persistent data file was empty. Falling back to seedData.json.");
            }
            catch (JsonException jsonEx)
            {
                _logger?.LogError(jsonEx, "Persistent data file {Path} is corrupted or invalid JSON. Backing up and falling back to seedData.json.", _dataFilePath);
                try
                {
                    var backupPath = $"{_dataFilePath}.corrupt.{DateTime.UtcNow:yyyyMMddHHmmss}.bak";
                    File.Copy(_dataFilePath, backupPath, overwrite: true);
                    _logger?.LogWarning("Corrupted data backed up to: {BackupPath}", backupPath);
                }
                catch (Exception backupEx)
                {
                    _logger?.LogError(backupEx, "Failed to create backup of corrupted file.");
                }
            }
            catch (Exception ex)
            {
                _logger?.LogError(ex, "Failed to read persistent data file {Path}. Falling back to seedData.json.", _dataFilePath);
            }
        }

        // 2. Persistent file does not exist or was corrupted -> initialize from seedData.json
        _logger?.LogInformation("Persistent file not found or invalid. Initializing from seedData.json...");
        LoadFromSeedData(contentRootPath, logger);

        // 3. Immediately persist initial data into the persistent file
        try
        {
            SaveToFile();
            _logger?.LogInformation("Successfully created initial persistent data file at: {Path}", _dataFilePath);
        }
        catch (Exception ex)
        {
            _logger?.LogError(ex, "Failed to write initial persistent data file to {Path}.", _dataFilePath);
            throw;
        }
    }

    private void LoadFromSnapshot(AdvocateDataSnapshot snapshot)
    {
        _cases.Clear();
        foreach (var c in snapshot.Cases)
        {
            if (!string.IsNullOrEmpty(c.Id)) _cases[c.Id] = c;
        }

        _clients.Clear();
        foreach (var c in snapshot.Clients)
        {
            if (!string.IsNullOrEmpty(c.Id)) _clients[c.Id] = c;
        }

        _appointments.Clear();
        foreach (var a in snapshot.Appointments)
        {
            if (!string.IsNullOrEmpty(a.Id)) _appointments[a.Id] = a;
        }

        _tasks.Clear();
        foreach (var t in snapshot.Tasks)
        {
            if (!string.IsNullOrEmpty(t.Id)) _tasks[t.Id] = t;
        }

        _records.Clear();
        foreach (var r in snapshot.Records)
        {
            if (!string.IsNullOrEmpty(r.Id)) _records[r.Id] = r;
        }

        _notifications.Clear();
        foreach (var n in snapshot.Notifications)
        {
            if (!string.IsNullOrEmpty(n.Id)) _notifications[n.Id] = n;
        }

        lock (_activityLock)
        {
            _activities.Clear();
            _activities.AddRange(snapshot.Activities);
        }

        _users.Clear();
        foreach (var u in snapshot.Users)
        {
            if (!string.IsNullOrEmpty(u.Id)) _users[u.Id] = u;
        }

        _rbacRoles.Clear();
        foreach (var (k, v) in snapshot.RbacMatrix)
        {
            v.RoleKey = k;
            _rbacRoles[k] = v;
        }
    }

    private void LoadFromSeedData(string contentRootPath, ILogger? logger)
    {
        string[] searchPaths =
        [
            Path.Combine(contentRootPath, "seedData.json"),
            Path.Combine(AppContext.BaseDirectory, "seedData.json"),
            Path.Combine(Directory.GetCurrentDirectory(), "seedData.json")
        ];

        string? foundPath = searchPaths.FirstOrDefault(File.Exists);

        if (foundPath != null)
        {
            try
            {
                logger?.LogInformation("Reading seed data from {Path}...", foundPath);
                var json = File.ReadAllText(foundPath);
                using var doc = JsonDocument.Parse(json);
                var root = doc.RootElement;

                if (root.TryGetProperty("cases", out var casesEl))
                {
                    var items = JsonSerializer.Deserialize<List<CaseItem>>(casesEl.GetRawText(), JsonOptions);
                    if (items != null)
                    {
                        foreach (var item in items)
                        {
                            if (!string.IsNullOrEmpty(item.Id)) _cases[item.Id] = item;
                        }
                    }
                }

                if (root.TryGetProperty("clients", out var clientsEl))
                {
                    var items = JsonSerializer.Deserialize<List<ClientItem>>(clientsEl.GetRawText(), JsonOptions);
                    if (items != null)
                    {
                        foreach (var item in items)
                        {
                            if (!string.IsNullOrEmpty(item.Id)) _clients[item.Id] = item;
                        }
                    }
                }

                if (root.TryGetProperty("appointments", out var apptsEl))
                {
                    var items = JsonSerializer.Deserialize<List<AppointmentItem>>(apptsEl.GetRawText(), JsonOptions);
                    if (items != null)
                    {
                        foreach (var item in items)
                        {
                            if (!string.IsNullOrEmpty(item.Id)) _appointments[item.Id] = item;
                        }
                    }
                }

                if (root.TryGetProperty("tasks", out var tasksEl))
                {
                    var items = JsonSerializer.Deserialize<List<TaskItem>>(tasksEl.GetRawText(), JsonOptions);
                    if (items != null)
                    {
                        foreach (var item in items)
                        {
                            if (!string.IsNullOrEmpty(item.Id)) _tasks[item.Id] = item;
                        }
                    }
                }

                if (root.TryGetProperty("records", out var recordsEl))
                {
                    var items = JsonSerializer.Deserialize<List<RecordItem>>(recordsEl.GetRawText(), JsonOptions);
                    if (items != null)
                    {
                        foreach (var item in items)
                        {
                            if (!string.IsNullOrEmpty(item.Id)) _records[item.Id] = item;
                        }
                    }
                }

                if (root.TryGetProperty("notifications", out var notifsEl))
                {
                    var items = JsonSerializer.Deserialize<List<NotificationItem>>(notifsEl.GetRawText(), JsonOptions);
                    if (items != null)
                    {
                        foreach (var item in items)
                        {
                            if (!string.IsNullOrEmpty(item.Id)) _notifications[item.Id] = item;
                        }
                    }
                }

                if (root.TryGetProperty("activities", out var actsEl))
                {
                    var items = JsonSerializer.Deserialize<List<ActivityItem>>(actsEl.GetRawText(), JsonOptions);
                    if (items != null)
                    {
                        lock (_activityLock)
                        {
                            _activities.Clear();
                            _activities.AddRange(items);
                        }
                    }
                }

                if (root.TryGetProperty("users", out var usersEl))
                {
                    var items = JsonSerializer.Deserialize<List<UserItem>>(usersEl.GetRawText(), JsonOptions);
                    if (items != null)
                    {
                        foreach (var item in items)
                        {
                            if (!string.IsNullOrEmpty(item.Id)) _users[item.Id] = item;
                        }
                    }
                }

                if (root.TryGetProperty("rbacMatrix", out var rbacEl))
                {
                    foreach (var prop in rbacEl.EnumerateObject())
                    {
                        var roleItem = JsonSerializer.Deserialize<RbacRoleItem>(prop.Value.GetRawText(), JsonOptions);
                        if (roleItem != null)
                        {
                            roleItem.RoleKey = prop.Name;
                            _rbacRoles[prop.Name] = roleItem;
                        }
                    }
                }

                logger?.LogInformation("Successfully initialized from seedData.json with {Cases} cases, {Clients} clients, {Users} users.",
                    _cases.Count, _clients.Count, _users.Count);
                return;
            }
            catch (Exception ex)
            {
                logger?.LogError(ex, "Failed to load seedData.json. Falling back to default mock data.");
            }
        }

        SeedFallbackData();
    }

    private void SeedFallbackData()
    {
        var defaultUser = new UserItem
        {
            Id = "usr_1",
            Name = "Advocate Vivek",
            Email = "vivek@example.com",
            Role = "admin",
            Avatar = "AV",
            Color = "#4f46e5"
        };
        _users[defaultUser.Id] = defaultUser;

        var defaultCase = new CaseItem
        {
            Id = "case_1",
            Cnr = "TNCB0A0000732026",
            CaseNumber = "CC 250/2026",
            Title = "Deputy Commissioner vs CIBI International",
            Court = "Madras High Court",
            Status = "Active",
            Category = "CORPORATE",
            Priority = "HIGH",
            Judge = "Hon. Justice Srinivasan"
        };
        _cases[defaultCase.Id] = defaultCase;

        var defaultClient = new ClientItem
        {
            Id = "cli_1",
            Name = "Sharma & Associates",
            Company = "Sharma Group",
            Email = "contact@sharma.com",
            Phone = "+91 98765 43210"
        };
        _clients[defaultClient.Id] = defaultClient;
    }

    public void SaveToFile()
    {
        if (string.IsNullOrWhiteSpace(_dataFilePath)) return;

        lock (_fileLock)
        {
            string? tempFilePath = null;
            try
            {
                var directory = Path.GetDirectoryName(_dataFilePath);
                if (!string.IsNullOrEmpty(directory) && !Directory.Exists(directory))
                {
                    Directory.CreateDirectory(directory);
                }

                var snapshot = new AdvocateDataSnapshot
                {
                    Cases = _cases.Values.ToList(),
                    Clients = _clients.Values.ToList(),
                    Appointments = _appointments.Values.ToList(),
                    Tasks = _tasks.Values.ToList(),
                    Records = _records.Values.ToList(),
                    Notifications = _notifications.Values.ToList(),
                    Activities = GetActivities().ToList(),
                    Users = _users.Values.ToList(),
                    RbacMatrix = _rbacRoles.ToDictionary(kvp => kvp.Key, kvp => kvp.Value)
                };

                var json = JsonSerializer.Serialize(snapshot, JsonOptions);

                // Use unique temporary file in the same directory for atomic replacement
                tempFilePath = $"{_dataFilePath}.tmp.{Guid.NewGuid():N}";

                using (var stream = new FileStream(tempFilePath, FileMode.Create, FileAccess.Write, FileShare.None, 4096, FileOptions.WriteThrough))
                using (var writer = new StreamWriter(stream, Encoding.UTF8))
                {
                    writer.Write(json);
                    writer.Flush();
                }

                // Atomic rename/move over target file
                File.Move(tempFilePath, _dataFilePath, overwrite: true);
                tempFilePath = null; // Successfully moved
            }
            catch (Exception ex)
            {
                _logger?.LogError(ex, "Failed to persist data snapshot to {Path}", _dataFilePath);
                throw new IOException($"Failed to persist data snapshot to '{_dataFilePath}': {ex.Message}", ex);
            }
            finally
            {
                if (tempFilePath != null && File.Exists(tempFilePath))
                {
                    try
                    {
                        File.Delete(tempFilePath);
                    }
                    catch
                    {
                        // Ignore cleanup error
                    }
                }
            }
        }
    }

    // Cases
    public IEnumerable<CaseItem> GetCases() => _cases.Values.ToList();
    public CaseItem? GetCase(string id) => _cases.TryGetValue(id, out var item) ? item : null;
    public CaseItem AddCase(CaseItem item)
    {
        _cases[item.Id] = item;
        SaveToFile();
        return item;
    }
    public CaseItem UpdateCase(string id, CaseItem item)
    {
        _cases[id] = item;
        SaveToFile();
        return item;
    }
    public bool DeleteCase(string id)
    {
        var removed = _cases.TryRemove(id, out _);
        if (removed)
        {
            // Unlink from clients
            foreach (var client in _clients.Values)
            {
                if (client.LinkedCases != null && client.LinkedCases.Contains(id))
                {
                    client.LinkedCases.Remove(id);
                }
            }

            // Unlink from tasks
            foreach (var task in _tasks.Values)
            {
                if (task.CaseId == id)
                {
                    task.CaseId = null;
                }
            }

            SaveToFile();
        }
        return removed;
    }

    // Clients
    public IEnumerable<ClientItem> GetClients() => _clients.Values.ToList();
    public ClientItem? GetClient(string id) => _clients.TryGetValue(id, out var item) ? item : null;
    public ClientItem AddClient(ClientItem item)
    {
        _clients[item.Id] = item;
        SaveToFile();
        return item;
    }
    public ClientItem UpdateClient(string id, ClientItem item)
    {
        _clients[id] = item;
        SaveToFile();
        return item;
    }
    public bool DeleteClient(string id)
    {
        var removed = _clients.TryRemove(id, out _);
        if (removed)
        {
            SaveToFile();
        }
        return removed;
    }

    // Appointments
    public IEnumerable<AppointmentItem> GetAppointments() => _appointments.Values.ToList();
    public AppointmentItem? GetAppointment(string id) => _appointments.TryGetValue(id, out var item) ? item : null;
    public AppointmentItem AddAppointment(AppointmentItem item)
    {
        _appointments[item.Id] = item;
        SaveToFile();
        return item;
    }
    public AppointmentItem UpdateAppointment(string id, AppointmentItem item)
    {
        _appointments[id] = item;
        SaveToFile();
        return item;
    }
    public bool DeleteAppointment(string id)
    {
        var removed = _appointments.TryRemove(id, out _);
        if (removed)
        {
            SaveToFile();
        }
        return removed;
    }

    // Tasks
    public IEnumerable<TaskItem> GetTasks() => _tasks.Values.ToList();
    public TaskItem? GetTask(string id) => _tasks.TryGetValue(id, out var item) ? item : null;
    public TaskItem AddTask(TaskItem item)
    {
        _tasks[item.Id] = item;
        SaveToFile();
        return item;
    }
    public TaskItem UpdateTask(string id, TaskItem item)
    {
        _tasks[id] = item;
        SaveToFile();
        return item;
    }
    public bool DeleteTask(string id)
    {
        var removed = _tasks.TryRemove(id, out _);
        if (removed)
        {
            SaveToFile();
        }
        return removed;
    }

    // Records
    public IEnumerable<RecordItem> GetRecords() => _records.Values.ToList();
    public RecordItem? GetRecord(string id) => _records.TryGetValue(id, out var item) ? item : null;
    public RecordItem AddRecord(RecordItem item)
    {
        _records[item.Id] = item;
        SaveToFile();
        return item;
    }
    public RecordItem UpdateRecord(string id, RecordItem item)
    {
        _records[id] = item;
        SaveToFile();
        return item;
    }
    public bool DeleteRecord(string id)
    {
        var removed = _records.TryRemove(id, out _);
        if (removed)
        {
            SaveToFile();
        }
        return removed;
    }

    // Notifications
    public IEnumerable<NotificationItem> GetNotifications() => _notifications.Values.ToList();
    public NotificationItem? GetNotification(string id) => _notifications.TryGetValue(id, out var item) ? item : null;
    public NotificationItem AddNotification(NotificationItem item)
    {
        _notifications[item.Id] = item;
        SaveToFile();
        return item;
    }
    public NotificationItem UpdateNotification(string id, NotificationItem item)
    {
        _notifications[id] = item;
        SaveToFile();
        return item;
    }
    public bool DeleteNotification(string id)
    {
        var removed = _notifications.TryRemove(id, out _);
        if (removed)
        {
            SaveToFile();
        }
        return removed;
    }

    // Activities
    public IEnumerable<ActivityItem> GetActivities()
    {
        lock (_activityLock)
        {
            return _activities.OrderByDescending(a => a.Id).ToList();
        }
    }
    public ActivityItem AddActivity(ActivityItem item)
    {
        lock (_activityLock)
        {
            _activities.Add(item);
        }
        SaveToFile();
        return item;
    }

    // Users
    public IEnumerable<UserItem> GetUsers() => _users.Values.ToList();
    public UserItem? GetUser(string id) => _users.TryGetValue(id, out var item) ? item : null;
    public UserItem AddUser(UserItem item)
    {
        _users[item.Id] = item;
        SaveToFile();
        return item;
    }
    public UserItem UpdateUser(string id, UserItem item)
    {
        _users[id] = item;
        SaveToFile();
        return item;
    }

    // RBAC
    public Dictionary<string, RbacRoleItem> GetRbacRoles() => new(_rbacRoles);
    public RbacRoleItem? GetRbacRole(string key) => _rbacRoles.TryGetValue(key, out var r) ? r : null;
    public void SetRbacRole(string key, RbacRoleItem item)
    {
        _rbacRoles[key] = item;
        SaveToFile();
    }
    public void UpdateRbacMatrix(Dictionary<string, RbacRoleDto> matrix)
    {
        foreach (var (key, dto) in matrix)
        {
            if (_rbacRoles.TryGetValue(key, out var existing))
            {
                existing.Label = dto.Label;
                existing.Avatar = dto.Avatar;
                existing.Color = dto.Color;
                existing.Permissions = dto.Permissions;
            }
            else
            {
                _rbacRoles[key] = new RbacRoleItem
                {
                    RoleKey = key,
                    Label = dto.Label,
                    Avatar = dto.Avatar,
                    Color = dto.Color,
                    Permissions = dto.Permissions
                };
            }
        }
        SaveToFile();
    }
}
