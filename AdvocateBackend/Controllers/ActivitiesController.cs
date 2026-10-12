using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AdvocateApi.Data;
using AdvocateApi.Models;

namespace AdvocateApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ActivitiesController : ControllerBase
{
    private readonly AppDbContext _context;

    public ActivitiesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ActivityItem>>> GetActivities()
    {
        return await _context.Activities.OrderByDescending(a => a.Id).ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<ActivityItem>> CreateActivity([FromBody] ActivityItem item)
    {
        if (string.IsNullOrWhiteSpace(item.Id))
        {
            item.Id = "act_" + DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        }

        _context.Activities.Add(item);
        await _context.SaveChangesAsync();
        return Ok(item);
    }
}
