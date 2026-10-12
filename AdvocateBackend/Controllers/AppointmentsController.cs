using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AdvocateApi.Data;
using AdvocateApi.Models;

namespace AdvocateApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AppointmentsController : ControllerBase
{
    private readonly AppDbContext _context;

    public AppointmentsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppointmentItem>>> GetAppointments()
    {
        return await _context.Appointments.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AppointmentItem>> GetAppointment(string id)
    {
        var item = await _context.Appointments.FindAsync(id);
        if (item == null) return NotFound();
        return item;
    }

    [HttpPost]
    public async Task<ActionResult<AppointmentItem>> CreateAppointment([FromBody] AppointmentItem item)
    {
        if (string.IsNullOrWhiteSpace(item.Id))
        {
            item.Id = "appt_" + DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        }

        _context.Appointments.Add(item);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAppointment), new { id = item.Id }, item);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAppointment(string id, [FromBody] AppointmentItem item)
    {
        if (id != item.Id)
        {
            item.Id = id;
        }

        var existing = await _context.Appointments.FindAsync(id);
        if (existing == null)
        {
            _context.Appointments.Add(item);
        }
        else
        {
            _context.Entry(existing).CurrentValues.SetValues(item);
        }

        await _context.SaveChangesAsync();
        return Ok(item);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAppointment(string id)
    {
        var item = await _context.Appointments.FindAsync(id);
        if (item == null) return NotFound();

        _context.Appointments.Remove(item);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
