using Microsoft.AspNetCore.Mvc;
using AdvocateApi.Data;
using AdvocateApi.Models;

namespace AdvocateApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AppointmentsController : ControllerBase
{
    private readonly InMemoryDataStore _store;

    public AppointmentsController(InMemoryDataStore store)
    {
        _store = store;
    }

    [HttpGet]
    public ActionResult<IEnumerable<AppointmentItem>> GetAppointments()
    {
        return Ok(_store.GetAppointments());
    }

    [HttpGet("{id}")]
    public ActionResult<AppointmentItem> GetAppointment(string id)
    {
        var item = _store.GetAppointment(id);
        if (item == null) return NotFound();
        return Ok(item);
    }

    [HttpPost]
    public ActionResult<AppointmentItem> CreateAppointment([FromBody] AppointmentItem item)
    {
        if (string.IsNullOrWhiteSpace(item.Id))
        {
            item.Id = "appt_" + DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        }

        if (string.IsNullOrWhiteSpace(item.Venue) && !string.IsNullOrWhiteSpace(item.Location))
            item.Venue = item.Location;
        else if (string.IsNullOrWhiteSpace(item.Location) && !string.IsNullOrWhiteSpace(item.Venue))
            item.Location = item.Venue;

        _store.AddAppointment(item);
        return CreatedAtAction(nameof(GetAppointment), new { id = item.Id }, item);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateAppointment(string id, [FromBody] AppointmentItem item)
    {
        if (id != item.Id)
        {
            item.Id = id;
        }

        if (string.IsNullOrWhiteSpace(item.Venue) && !string.IsNullOrWhiteSpace(item.Location))
            item.Venue = item.Location;
        else if (string.IsNullOrWhiteSpace(item.Location) && !string.IsNullOrWhiteSpace(item.Venue))
            item.Location = item.Venue;

        _store.UpdateAppointment(id, item);
        return Ok(item);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteAppointment(string id)
    {
        var deleted = _store.DeleteAppointment(id);
        if (!deleted) return NotFound();

        return NoContent();
    }
}
