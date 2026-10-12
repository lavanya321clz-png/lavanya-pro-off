using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AdvocateApi.Data;
using AdvocateApi.Models;

namespace AdvocateApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;

    public UsersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserItem>>> GetUsers()
    {
        return await _context.Users.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserItem>> GetUser(string id)
    {
        var item = await _context.Users.FindAsync(id);
        if (item == null) return NotFound();
        return item;
    }

    [HttpPost]
    public async Task<ActionResult<UserItem>> CreateUser([FromBody] UserItem item)
    {
        if (string.IsNullOrWhiteSpace(item.Id))
        {
            item.Id = "usr_" + DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        }

        _context.Users.Add(item);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetUser), new { id = item.Id }, item);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(string id, [FromBody] UserItem item)
    {
        if (id != item.Id)
        {
            item.Id = id;
        }

        var existing = await _context.Users.FindAsync(id);
        if (existing == null)
        {
            _context.Users.Add(item);
        }
        else
        {
            _context.Entry(existing).CurrentValues.SetValues(item);
        }

        await _context.SaveChangesAsync();
        return Ok(item);
    }
}
