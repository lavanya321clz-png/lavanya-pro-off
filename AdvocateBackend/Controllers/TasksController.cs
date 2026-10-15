using Microsoft.AspNetCore.Mvc;
using AdvocateApi.Data;
using AdvocateApi.Models;

namespace AdvocateApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly InMemoryDataStore _store;

    public TasksController(InMemoryDataStore store)
    {
        _store = store;
    }

    [HttpGet]
    public ActionResult<IEnumerable<TaskItem>> GetTasks()
    {
        return Ok(_store.GetTasks());
    }

    [HttpGet("{id}")]
    public ActionResult<TaskItem> GetTask(string id)
    {
        var item = _store.GetTask(id);
        if (item == null) return NotFound();
        return Ok(item);
    }

    [HttpPost]
    public ActionResult<TaskItem> CreateTask([FromBody] TaskItem item)
    {
        if (string.IsNullOrWhiteSpace(item.Id))
        {
            item.Id = "tsk_" + DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        }

        if (string.IsNullOrWhiteSpace(item.AssignedUser) && !string.IsNullOrWhiteSpace(item.AssignedTo))
            item.AssignedUser = item.AssignedTo;
        else if (string.IsNullOrWhiteSpace(item.AssignedTo) && !string.IsNullOrWhiteSpace(item.AssignedUser))
            item.AssignedTo = item.AssignedUser;

        _store.AddTask(item);
        return CreatedAtAction(nameof(GetTask), new { id = item.Id }, item);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateTask(string id, [FromBody] TaskItem item)
    {
        if (id != item.Id)
        {
            item.Id = id;
        }

        if (string.IsNullOrWhiteSpace(item.AssignedUser) && !string.IsNullOrWhiteSpace(item.AssignedTo))
            item.AssignedUser = item.AssignedTo;
        else if (string.IsNullOrWhiteSpace(item.AssignedTo) && !string.IsNullOrWhiteSpace(item.AssignedUser))
            item.AssignedTo = item.AssignedUser;

        if (item.Status == "done" || item.Status == "Completed")
            item.Completed = true;
        else if (item.Status == "todo" || item.Status == "in_progress")
            item.Completed = false;

        _store.UpdateTask(id, item);
        return Ok(item);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteTask(string id)
    {
        var deleted = _store.DeleteTask(id);
        if (!deleted) return NotFound();

        return NoContent();
    }
}
