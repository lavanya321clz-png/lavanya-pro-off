using Microsoft.AspNetCore.Mvc;
using AdvocateApi.Data;
using AdvocateApi.Models;

namespace AdvocateApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClientsController : ControllerBase
{
    private readonly InMemoryDataStore _store;

    public ClientsController(InMemoryDataStore store)
    {
        _store = store;
    }

    [HttpGet]
    public ActionResult<IEnumerable<ClientItem>> GetClients()
    {
        return Ok(_store.GetClients());
    }

    [HttpGet("{id}")]
    public ActionResult<ClientItem> GetClient(string id)
    {
        var item = _store.GetClient(id);
        if (item == null) return NotFound();
        return Ok(item);
    }

    [HttpPost]
    public ActionResult<ClientItem> CreateClient([FromBody] ClientItem item)
    {
        if (string.IsNullOrWhiteSpace(item.Id))
        {
            item.Id = "cli_" + DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        }

        _store.AddClient(item);
        return CreatedAtAction(nameof(GetClient), new { id = item.Id }, item);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateClient(string id, [FromBody] ClientItem item)
    {
        if (id != item.Id)
        {
            item.Id = id;
        }

        _store.UpdateClient(id, item);
        return Ok(item);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteClient(string id)
    {
        var deleted = _store.DeleteClient(id);
        if (!deleted) return NotFound();

        return NoContent();
    }
}
