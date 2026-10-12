using System.Text.Json;
using System.Text.Json.Serialization;

namespace AdvocateApi.Models;

public class CaseItem
{
    public string Id { get; set; } = string.Empty;
    public string Cnr { get; set; } = string.Empty;
    public string CaseNumber { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Court { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string? NextHearing { get; set; }
    public string Judge { get; set; } = string.Empty;
    public string CourtRoom { get; set; } = string.Empty;
    public string FilingDate { get; set; } = string.Empty;
    public string Stage { get; set; } = string.Empty;
    public string OpposingCounsel { get; set; } = string.Empty;
    public string LeadCounsel { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Priority { get; set; } = string.Empty;
    public string? AssignedJunior { get; set; }

    public object? ClientCoordinates { get; set; }
    public List<object>? Parties { get; set; }
    public List<object>? Hearings { get; set; }
    public List<object>? Orders { get; set; }
    public List<object>? CourtAppearances { get; set; }
    public List<string>? Notes { get; set; }
}

public class ClientItem
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string? Avatar { get; set; }
    public string? Address { get; set; }
    public string? Status { get; set; }
    public string? Tier { get; set; }
    public List<string>? LinkedCases { get; set; }
    public List<string>? LinkedRecords { get; set; }
    public List<string>? Notes { get; set; }
    public List<object>? Documents { get; set; }
    public string? BillingBalance { get; set; }
    public string? PaymentStatus { get; set; }
    public string? Pan { get; set; }
    public string? Gstin { get; set; }
}

public class AppointmentItem
{
    public string Id { get; set; } = string.Empty;
    public string ClientName { get; set; } = string.Empty;
    public string? Company { get; set; }
    public string Date { get; set; } = string.Empty;
    public string Time { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Purpose { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string? Notes { get; set; }
    public string? Venue { get; set; }
    public string? VideoPlatform { get; set; }
    public string? VideoLink { get; set; }
    public string? Phone { get; set; }
}

public class TaskItem
{
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string DueDate { get; set; } = string.Empty;
    public string Priority { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string AssignedTo { get; set; } = string.Empty;
    public string? CaseId { get; set; }
    public bool Completed { get; set; }
}

public class RecordItem
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string Owner { get; set; } = string.Empty;
    public string UpdatedDate { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public List<string>? Notes { get; set; }
    public List<object>? ActivityLog { get; set; }
}

public class NotificationItem
{
    public string Id { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public string Time { get; set; } = string.Empty;
    public bool Read { get; set; }
    public string? ClientName { get; set; }
}

public class ActivityItem
{
    public string Id { get; set; } = string.Empty;
    public string User { get; set; } = string.Empty;
    public string Action { get; set; } = string.Empty;
    public string Target { get; set; } = string.Empty;
    public string Time { get; set; } = string.Empty;
}

public class UserItem
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string Avatar { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
}

public class RbacRoleItem
{
    public string RoleKey { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;
    public string Avatar { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
    public Dictionary<string, bool> Permissions { get; set; } = new();
}
