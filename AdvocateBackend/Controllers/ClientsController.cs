using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AdvocateApi.Data;
using AdvocateApi.Models;

namespace AdvocateApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClientsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ClientsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ClientItem>>> GetClients()
    {
        return await _context.Clients.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ClientItem>> GetClient(string id)
    {
        var item = await _context.Clients.FindAsync(id);
        if (item == null) return NotFound();
        return item;
    }

    [HttpPost]
    public async Task<ActionResult<ClientItem>> CreateClient([FromBody] ClientItem item)
    {
        if (string.IsNullOrWhiteSpace(item.Id))
        {
            item.Id = "cli_" + DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        }

        _context.Clients.Add(item);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetClient), new { id = item.Id }, item);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateClient(string id, [FromBody] ClientItem item)
    {
        if (id != item.Id)
        {
            item.Id = id;
        }

        var existing = await _context.Clients.FindAsync(id);
        if (existing == null)
        {
            _context.Clients.Add(item);
        }
        else
        {
            _context.Entry(existing).CurrentValues.SetValues(item);
            existing.LinkedCases = item.LinkedCases;
        }

        await _context.SaveChangesAsync();
        return Ok(item);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteClient(string id)
    {
        var item = await _context.Clients.FindAsync(id);
        if (item == null) return NotFound();

        _context.Clients.Remove(item);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
