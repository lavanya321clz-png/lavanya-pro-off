using Microsoft.AspNetCore.Mvc;
using AdvocateApi.Data;
using AdvocateApi.Models;

namespace AdvocateApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ActivitiesController : ControllerBase
{
    private readonly InMemoryDataStore _store;

    public ActivitiesController(InMemoryDataStore store)
    {
        _store = store;
    }

    [HttpGet]
    public ActionResult<IEnumerable<ActivityItem>> GetActivities()
    {
        return Ok(_store.GetActivities());
    }

    [HttpPost]
    public ActionResult<ActivityItem> CreateActivity([FromBody] ActivityItem item)
    {
        if (string.IsNullOrWhiteSpace(item.Id))
        {
            item.Id = "act_" + DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        }

        _store.AddActivity(item);
        return Ok(item);
    }
}
