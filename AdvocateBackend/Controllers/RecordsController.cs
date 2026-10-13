using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AdvocateApi.Data;
using AdvocateApi.Models;

namespace AdvocateApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RecordsController : ControllerBase
{
    private readonly AppDbContext _context;

    public RecordsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<RecordItem>>> GetRecords()
    {
        return await _context.Records.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<RecordItem>> GetRecord(string id)
    {
        var item = await _context.Records.FindAsync(id);
        if (item == null) return NotFound();
        return item;
    }

    [HttpPost]
    public async Task<ActionResult<RecordItem>> CreateRecord([FromBody] RecordItem item)
    {
        if (string.IsNullOrWhiteSpace(item.Id))
        {
            item.Id = "rec_" + DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        }

        _context.Records.Add(item);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetRecord), new { id = item.Id }, item);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRecord(string id, [FromBody] RecordItem item)
    {
        if (id != item.Id)
        {
            item.Id = id;
        }

        var existing = await _context.Records.FindAsync(id);
        if (existing == null)
        {
            _context.Records.Add(item);
        }
        else
        {
            _context.Entry(existing).CurrentValues.SetValues(item);
            existing.Notes = item.Notes;
            existing.ActivityLog = item.ActivityLog;
            _context.Entry(existing).State = EntityState.Modified;
        }

        await _context.SaveChangesAsync();
        return Ok(item);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRecord(string id)
    {
        var item = await _context.Records.FindAsync(id);
        if (item == null) return NotFound();

        _context.Records.Remove(item);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
