using Microsoft.AspNetCore.Mvc;
using AdvocateApi.Data;
using AdvocateApi.Models;

namespace AdvocateApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly InMemoryDataStore _store;

    public UsersController(InMemoryDataStore store)
    {
        _store = store;
    }

    [HttpGet]
    public ActionResult<IEnumerable<UserItem>> GetUsers()
    {
        return Ok(_store.GetUsers());
    }

    [HttpGet("{id}")]
    public ActionResult<UserItem> GetUser(string id)
    {
        var item = _store.GetUser(id);
        if (item == null) return NotFound();
        return Ok(item);
    }

    [HttpPost]
    public ActionResult<UserItem> CreateUser([FromBody] UserItem item)
    {
        if (string.IsNullOrWhiteSpace(item.Id))
        {
            item.Id = "usr_" + DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        }

        _store.AddUser(item);
        return CreatedAtAction(nameof(GetUser), new { id = item.Id }, item);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateUser(string id, [FromBody] UserItem item)
    {
        if (id != item.Id)
        {
            item.Id = id;
        }

        _store.UpdateUser(id, item);
        return Ok(item);
    }
}
