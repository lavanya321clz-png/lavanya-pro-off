using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using AdvocateApi.Models;

namespace AdvocateApi.Data;

public class AppDbContext : DbContext
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        PropertyNameCaseInsensitive = true,
        WriteIndented = false
    };

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<CaseItem> Cases => Set<CaseItem>();
    public DbSet<ClientItem> Clients => Set<ClientItem>();
    public DbSet<AppointmentItem> Appointments => Set<AppointmentItem>();
    public DbSet<TaskItem> Tasks => Set<TaskItem>();
    public DbSet<RecordItem> Records => Set<RecordItem>();
    public DbSet<NotificationItem> Notifications => Set<NotificationItem>();
    public DbSet<ActivityItem> Activities => Set<ActivityItem>();
    public DbSet<UserItem> Users => Set<UserItem>();
    public DbSet<RbacRoleItem> RbacRoles => Set<RbacRoleItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Schema name requested by the user: "AWS"
        modelBuilder.HasDefaultSchema("AWS");

        var objectConverter = new ValueConverter<object?, string>(
            v => v == null ? "{}" : JsonSerializer.Serialize(v, JsonOptions),
            v => string.IsNullOrWhiteSpace(v) ? null : JsonSerializer.Deserialize<object>(v, JsonOptions)
        );

        var objectListConverter = new ValueConverter<List<object>?, string>(
            v => v == null ? "[]" : JsonSerializer.Serialize(v, JsonOptions),
            v => string.IsNullOrWhiteSpace(v) ? new List<object>() : JsonSerializer.Deserialize<List<object>>(v, JsonOptions) ?? new List<object>()
        );

        var stringListConverter = new ValueConverter<List<string>?, string>(
            v => v == null ? "[]" : JsonSerializer.Serialize(v, JsonOptions),
            v => string.IsNullOrWhiteSpace(v) ? new List<string>() : JsonSerializer.Deserialize<List<string>>(v, JsonOptions) ?? new List<string>()
        );

        var dictConverter = new ValueConverter<Dictionary<string, bool>, string>(
            v => v == null ? "{}" : JsonSerializer.Serialize(v, JsonOptions),
            v => string.IsNullOrWhiteSpace(v) ? new Dictionary<string, bool>() : JsonSerializer.Deserialize<Dictionary<string, bool>>(v, JsonOptions) ?? new Dictionary<string, bool>()
        );

        var stringListComparer = new ValueComparer<List<string>?>(
            (c1, c2) => c1 != null && c2 != null ? c1.SequenceEqual(c2) : c1 == c2,
            c => c == null ? 0 : c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
            c => c == null ? null : c.ToList()
        );

        var objectListComparer = new ValueComparer<List<object>?>(
            (c1, c2) => JsonSerializer.Serialize(c1, JsonOptions) == JsonSerializer.Serialize(c2, JsonOptions),
            c => c == null ? 0 : JsonSerializer.Serialize(c, JsonOptions).GetHashCode(),
            c => c == null ? null : JsonSerializer.Deserialize<List<object>>(JsonSerializer.Serialize(c, JsonOptions), JsonOptions)
        );

        var dictComparer = new ValueComparer<Dictionary<string, bool>>(
            (d1, d2) => d1 != null && d2 != null && d1.Count == d2.Count && !d1.Except(d2).Any(),
            d => d == null ? 0 : d.Aggregate(0, (a, p) => HashCode.Combine(a, p.Key.GetHashCode(), p.Value.GetHashCode())),
            d => d == null ? new Dictionary<string, bool>() : new Dictionary<string, bool>(d)
        );

        var objectComparer = new ValueComparer<object?>(
            (c1, c2) => JsonSerializer.Serialize(c1, JsonOptions) == JsonSerializer.Serialize(c2, JsonOptions),
            c => c == null ? 0 : JsonSerializer.Serialize(c, JsonOptions).GetHashCode(),
            c => c == null ? null : JsonSerializer.Deserialize<object>(JsonSerializer.Serialize(c, JsonOptions), JsonOptions)
        );

        // CaseItem config
        modelBuilder.Entity<CaseItem>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.ClientCoordinates).HasConversion(objectConverter, objectComparer).HasColumnType("jsonb");
            entity.Property(e => e.Parties).HasConversion(objectListConverter, objectListComparer).HasColumnType("jsonb");
            entity.Property(e => e.Hearings).HasConversion(objectListConverter, objectListComparer).HasColumnType("jsonb");
            entity.Property(e => e.Orders).HasConversion(objectListConverter, objectListComparer).HasColumnType("jsonb");
            entity.Property(e => e.CourtAppearances).HasConversion(objectListConverter, objectListComparer).HasColumnType("jsonb");
            entity.Property(e => e.Notes).HasConversion(stringListConverter, stringListComparer).HasColumnType("jsonb");
        });

        // ClientItem config
        modelBuilder.Entity<ClientItem>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.LinkedCases).HasConversion(stringListConverter, stringListComparer).HasColumnType("jsonb");
            entity.Property(e => e.LinkedRecords).HasConversion(stringListConverter, stringListComparer).HasColumnType("jsonb");
            entity.Property(e => e.Notes).HasConversion(stringListConverter, stringListComparer).HasColumnType("jsonb");
            entity.Property(e => e.Documents).HasConversion(objectListConverter, objectListComparer).HasColumnType("jsonb");
        });

        // AppointmentItem config
        modelBuilder.Entity<AppointmentItem>(entity =>
        {
            entity.HasKey(e => e.Id);
        });

        // TaskItem config
        modelBuilder.Entity<TaskItem>(entity =>
        {
            entity.HasKey(e => e.Id);
        });

        // RecordItem config
        modelBuilder.Entity<RecordItem>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Notes).HasConversion(stringListConverter, stringListComparer).HasColumnType("jsonb");
            entity.Property(e => e.ActivityLog).HasConversion(objectListConverter, objectListComparer).HasColumnType("jsonb");
        });

        // NotificationItem config
        modelBuilder.Entity<NotificationItem>(entity =>
        {
            entity.HasKey(e => e.Id);
        });

        // ActivityItem config
        modelBuilder.Entity<ActivityItem>(entity =>
        {
            entity.HasKey(e => e.Id);
        });

        // UserItem config
        modelBuilder.Entity<UserItem>(entity =>
        {
            entity.HasKey(e => e.Id);
        });

        // RbacRoleItem config
        modelBuilder.Entity<RbacRoleItem>(entity =>
        {
            entity.HasKey(e => e.RoleKey);
            entity.Property(e => e.Permissions).HasConversion(dictConverter, dictComparer).HasColumnType("jsonb");
        });
    }
}
