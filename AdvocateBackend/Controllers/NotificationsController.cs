using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AdvocateApi.Data;
using AdvocateApi.Models;

namespace AdvocateApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotificationsController : ControllerBase
{
    private readonly AppDbContext _context;

    public NotificationsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<NotificationItem>>> GetNotifications()
    {
        return await _context.Notifications.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<NotificationItem>> GetNotification(string id)
    {
        var item = await _context.Notifications.FindAsync(id);
        if (item == null) return NotFound();
        return item;
    }

    [HttpPost]
    public async Task<ActionResult<NotificationItem>> CreateNotification([FromBody] NotificationItem item)
    {
        if (string.IsNullOrWhiteSpace(item.Id))
        {
            item.Id = "not_" + DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        }

        _context.Notifications.Add(item);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetNotification), new { id = item.Id }, item);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateNotification(string id, [FromBody] NotificationItem item)
    {
        if (id != item.Id)
        {
            item.Id = id;
        }

        var existing = await _context.Notifications.FindAsync(id);
        if (existing == null)
        {
            _context.Notifications.Add(item);
        }
        else
        {
            _context.Entry(existing).CurrentValues.SetValues(item);
        }

        await _context.SaveChangesAsync();
        return Ok(item);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteNotification(string id)
    {
        var item = await _context.Notifications.FindAsync(id);
        if (item == null) return NotFound();

        _context.Notifications.Remove(item);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
