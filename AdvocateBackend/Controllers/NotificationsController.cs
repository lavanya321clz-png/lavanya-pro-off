using Microsoft.AspNetCore.Mvc;
using AdvocateApi.Data;
using AdvocateApi.Models;

namespace AdvocateApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotificationsController : ControllerBase
{
    private readonly InMemoryDataStore _store;

    public NotificationsController(InMemoryDataStore store)
    {
        _store = store;
    }

    [HttpGet]
    public ActionResult<IEnumerable<NotificationItem>> GetNotifications()
    {
        return Ok(_store.GetNotifications());
    }

    [HttpGet("{id}")]
    public ActionResult<NotificationItem> GetNotification(string id)
    {
        var item = _store.GetNotification(id);
        if (item == null) return NotFound();
        return Ok(item);
    }

    [HttpPost]
    public ActionResult<NotificationItem> CreateNotification([FromBody] NotificationItem item)
    {
        if (string.IsNullOrWhiteSpace(item.Id))
        {
            item.Id = "not_" + DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        }

        _store.AddNotification(item);
        return CreatedAtAction(nameof(GetNotification), new { id = item.Id }, item);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateNotification(string id, [FromBody] NotificationItem item)
    {
        if (id != item.Id)
        {
            item.Id = id;
        }

        _store.UpdateNotification(id, item);
        return Ok(item);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteNotification(string id)
    {
        var deleted = _store.DeleteNotification(id);
        if (!deleted) return NotFound();

        return NoContent();
    }
}
