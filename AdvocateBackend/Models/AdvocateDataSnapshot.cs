using System.Text.Json.Serialization;

namespace AdvocateApi.Models;

public class AdvocateDataSnapshot
{
    [JsonPropertyName("cases")]
    public List<CaseItem> Cases { get; set; } = new();

    [JsonPropertyName("clients")]
    public List<ClientItem> Clients { get; set; } = new();

    [JsonPropertyName("appointments")]
    public List<AppointmentItem> Appointments { get; set; } = new();

    [JsonPropertyName("tasks")]
    public List<TaskItem> Tasks { get; set; } = new();

    [JsonPropertyName("records")]
    public List<RecordItem> Records { get; set; } = new();

    [JsonPropertyName("notifications")]
    public List<NotificationItem> Notifications { get; set; } = new();

    [JsonPropertyName("activities")]
    public List<ActivityItem> Activities { get; set; } = new();

    [JsonPropertyName("users")]
    public List<UserItem> Users { get; set; } = new();

    [JsonPropertyName("rbacMatrix")]
    public Dictionary<string, RbacRoleItem> RbacMatrix { get; set; } = new();
}
