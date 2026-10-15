using System.Collections.Concurrent;
using System.Text.Json;
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

    public int CasesCount => _cases.Count;
    public int ClientsCount => _clients.Count;
    public int AppointmentsCount => _appointments.Count;
    public int TasksCount => _tasks.Count;
    public int RecordsCount => _records.Count;
    public int UsersCount => _users.Count;

    public void Initialize(string contentRootPath, ILogger? logger = null)
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
                logger?.LogInformation("Loading in-memory mock data from {Path}...", foundPath);
                var json = File.ReadAllText(foundPath);
                var jsonOptions = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true,
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                };

                using var doc = JsonDocument.Parse(json);
                var root = doc.RootElement;

                if (root.TryGetProperty("cases", out var casesEl))
                {
                    var items = JsonSerializer.Deserialize<List<CaseItem>>(casesEl.GetRawText(), jsonOptions);
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
                    var items = JsonSerializer.Deserialize<List<ClientItem>>(clientsEl.GetRawText(), jsonOptions);
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
                    var items = JsonSerializer.Deserialize<List<AppointmentItem>>(apptsEl.GetRawText(), jsonOptions);
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
                    var items = JsonSerializer.Deserialize<List<TaskItem>>(tasksEl.GetRawText(), jsonOptions);
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
                    var items = JsonSerializer.Deserialize<List<RecordItem>>(recordsEl.GetRawText(), jsonOptions);
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
                    var items = JsonSerializer.Deserialize<List<NotificationItem>>(notifsEl.GetRawText(), jsonOptions);
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
                    var items = JsonSerializer.Deserialize<List<ActivityItem>>(actsEl.GetRawText(), jsonOptions);
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
                    var items = JsonSerializer.Deserialize<List<UserItem>>(usersEl.GetRawText(), jsonOptions);
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
                        var roleItem = JsonSerializer.Deserialize<RbacRoleItem>(prop.Value.GetRawText(), jsonOptions);
                        if (roleItem != null)
                        {
                            roleItem.RoleKey = prop.Name;
                            _rbacRoles[prop.Name] = roleItem;
                        }
                    }
                }

                logger?.LogInformation("Successfully initialized in-memory data store with {Cases} cases, {Clients} clients, {Users} users.",
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

    // Cases
    public IEnumerable<CaseItem> GetCases() => _cases.Values.ToList();
    public CaseItem? GetCase(string id) => _cases.TryGetValue(id, out var item) ? item : null;
    public CaseItem AddCase(CaseItem item)
    {
        _cases[item.Id] = item;
        return item;
    }
    public CaseItem UpdateCase(string id, CaseItem item)
    {
        _cases[id] = item;
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
        }
        return removed;
    }

    // Clients
    public IEnumerable<ClientItem> GetClients() => _clients.Values.ToList();
    public ClientItem? GetClient(string id) => _clients.TryGetValue(id, out var item) ? item : null;
    public ClientItem AddClient(ClientItem item)
    {
        _clients[item.Id] = item;
        return item;
    }
    public ClientItem UpdateClient(string id, ClientItem item)
    {
        _clients[id] = item;
        return item;
    }
    public bool DeleteClient(string id) => _clients.TryRemove(id, out _);

    // Appointments
    public IEnumerable<AppointmentItem> GetAppointments() => _appointments.Values.ToList();
    public AppointmentItem? GetAppointment(string id) => _appointments.TryGetValue(id, out var item) ? item : null;
    public AppointmentItem AddAppointment(AppointmentItem item)
    {
        _appointments[item.Id] = item;
        return item;
    }
    public AppointmentItem UpdateAppointment(string id, AppointmentItem item)
    {
        _appointments[id] = item;
        return item;
    }
    public bool DeleteAppointment(string id) => _appointments.TryRemove(id, out _);

    // Tasks
    public IEnumerable<TaskItem> GetTasks() => _tasks.Values.ToList();
    public TaskItem? GetTask(string id) => _tasks.TryGetValue(id, out var item) ? item : null;
    public TaskItem AddTask(TaskItem item)
    {
        _tasks[item.Id] = item;
        return item;
    }
    public TaskItem UpdateTask(string id, TaskItem item)
    {
        _tasks[id] = item;
        return item;
    }
    public bool DeleteTask(string id) => _tasks.TryRemove(id, out _);

    // Records
    public IEnumerable<RecordItem> GetRecords() => _records.Values.ToList();
    public RecordItem? GetRecord(string id) => _records.TryGetValue(id, out var item) ? item : null;
    public RecordItem AddRecord(RecordItem item)
    {
        _records[item.Id] = item;
        return item;
    }
    public RecordItem UpdateRecord(string id, RecordItem item)
    {
        _records[id] = item;
        return item;
    }
    public bool DeleteRecord(string id) => _records.TryRemove(id, out _);

    // Notifications
    public IEnumerable<NotificationItem> GetNotifications() => _notifications.Values.ToList();
    public NotificationItem? GetNotification(string id) => _notifications.TryGetValue(id, out var item) ? item : null;
    public NotificationItem AddNotification(NotificationItem item)
    {
        _notifications[item.Id] = item;
        return item;
    }
    public NotificationItem UpdateNotification(string id, NotificationItem item)
    {
        _notifications[id] = item;
        return item;
    }
    public bool DeleteNotification(string id) => _notifications.TryRemove(id, out _);

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
        return item;
    }

    // Users
    public IEnumerable<UserItem> GetUsers() => _users.Values.ToList();
    public UserItem? GetUser(string id) => _users.TryGetValue(id, out var item) ? item : null;
    public UserItem AddUser(UserItem item)
    {
        _users[item.Id] = item;
        return item;
    }
    public UserItem UpdateUser(string id, UserItem item)
    {
        _users[id] = item;
        return item;
    }

    // RBAC
    public Dictionary<string, RbacRoleItem> GetRbacRoles() => new(_rbacRoles);
    public RbacRoleItem? GetRbacRole(string key) => _rbacRoles.TryGetValue(key, out var r) ? r : null;
    public void SetRbacRole(string key, RbacRoleItem item)
    {
        _rbacRoles[key] = item;
    }
}
