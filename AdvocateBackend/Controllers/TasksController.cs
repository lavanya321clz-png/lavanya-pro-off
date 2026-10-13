using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AdvocateApi.Data;
using AdvocateApi.Models;

namespace AdvocateApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly AppDbContext _context;

    public TasksController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks()
    {
        return await _context.Tasks.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TaskItem>> GetTask(string id)
    {
        var item = await _context.Tasks.FindAsync(id);
        if (item == null) return NotFound();
        return item;
    }

    [HttpPost]
    public async Task<ActionResult<TaskItem>> CreateTask([FromBody] TaskItem item)
    {
        if (string.IsNullOrWhiteSpace(item.Id))
        {
            item.Id = "tsk_" + DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        }

        if (string.IsNullOrWhiteSpace(item.AssignedUser) && !string.IsNullOrWhiteSpace(item.AssignedTo))
            item.AssignedUser = item.AssignedTo;
        else if (string.IsNullOrWhiteSpace(item.AssignedTo) && !string.IsNullOrWhiteSpace(item.AssignedUser))
            item.AssignedTo = item.AssignedUser;

        _context.Tasks.Add(item);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetTask), new { id = item.Id }, item);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTask(string id, [FromBody] TaskItem item)
    {
        if (id != item.Id)
        {
            item.Id = id;
        }

        if (string.IsNullOrWhiteSpace(item.AssignedUser) && !string.IsNullOrWhiteSpace(item.AssignedTo))
            item.AssignedUser = item.AssignedTo;
        else if (string.IsNullOrWhiteSpace(item.AssignedTo) && !string.IsNullOrWhiteSpace(item.AssignedUser))
            item.AssignedTo = item.AssignedUser;

        var existing = await _context.Tasks.FindAsync(id);
        if (existing == null)
        {
            _context.Tasks.Add(item);
        }
        else
        {
            _context.Entry(existing).CurrentValues.SetValues(item);
            existing.AssignedUser = item.AssignedUser;
            existing.AssignedTo = item.AssignedTo ?? "";
        }

        await _context.SaveChangesAsync();
        return Ok(item);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(string id)
    {
        var item = await _context.Tasks.FindAsync(id);
        if (item == null) return NotFound();

        _context.Tasks.Remove(item);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
