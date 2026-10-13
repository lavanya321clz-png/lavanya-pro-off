using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AdvocateApi.Data;
using AdvocateApi.Models;

namespace AdvocateApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CasesController : ControllerBase
{
    private readonly AppDbContext _context;

    public CasesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CaseItem>>> GetCases()
    {
        return await _context.Cases.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CaseItem>> GetCase(string id)
    {
        var item = await _context.Cases.FindAsync(id);
        if (item == null) return NotFound();
        return item;
    }

    [HttpPost]
    public async Task<ActionResult<CaseItem>> CreateCase([FromBody] CaseItem item)
    {
        if (string.IsNullOrWhiteSpace(item.Id))
        {
            item.Id = "case_" + DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        }

        _context.Cases.Add(item);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetCase), new { id = item.Id }, item);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCase(string id, [FromBody] CaseItem item)
    {
        if (id != item.Id)
        {
            item.Id = id;
        }

        var existing = await _context.Cases.FindAsync(id);
        if (existing == null)
        {
            _context.Cases.Add(item);
        }
        else
        {
            _context.Entry(existing).CurrentValues.SetValues(item);
            existing.ClientCoordinates = item.ClientCoordinates;
            existing.Parties = item.Parties;
            existing.Hearings = item.Hearings;
            existing.Orders = item.Orders;
            existing.CourtAppearances = item.CourtAppearances;
            existing.Notes = item.Notes;
            existing.AssignedJunior = item.AssignedJunior;
            _context.Entry(existing).State = EntityState.Modified;
        }

        await _context.SaveChangesAsync();
        return Ok(item);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCase(string id)
    {
        var item = await _context.Cases.FindAsync(id);
        if (item == null) return NotFound(new { message = $"Case with ID '{id}' was not found." });

        _context.Cases.Remove(item);

        // Also unlink this case from any clients
        var linkedClients = await _context.Clients.ToListAsync();
        foreach (var client in linkedClients)
        {
            if (client.LinkedCases != null && client.LinkedCases.Contains(id))
            {
                client.LinkedCases.Remove(id);
            }
        }

        // Also unlink this case from any tasks
        var linkedTasks = await _context.Tasks.Where(t => t.CaseId == id).ToListAsync();
        foreach (var task in linkedTasks)
        {
            task.CaseId = null;
        }

        await _context.SaveChangesAsync();
        return NoContent();
    }
}
