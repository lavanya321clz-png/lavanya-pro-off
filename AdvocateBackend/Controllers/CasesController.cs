using Microsoft.AspNetCore.Mvc;
using AdvocateApi.Data;
using AdvocateApi.Models;

namespace AdvocateApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CasesController : ControllerBase
{
    private readonly InMemoryDataStore _store;

    public CasesController(InMemoryDataStore store)
    {
        _store = store;
    }

    [HttpGet]
    public ActionResult<IEnumerable<CaseItem>> GetCases()
    {
        return Ok(_store.GetCases());
    }

    [HttpGet("{id}")]
    public ActionResult<CaseItem> GetCase(string id)
    {
        var item = _store.GetCase(id);
        if (item == null) return NotFound();
        return Ok(item);
    }

    [HttpPost]
    public ActionResult<CaseItem> CreateCase([FromBody] CaseItem item)
    {
        if (string.IsNullOrWhiteSpace(item.Id))
        {
            item.Id = "case_" + DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        }

        _store.AddCase(item);
        return CreatedAtAction(nameof(GetCase), new { id = item.Id }, item);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateCase(string id, [FromBody] CaseItem item)
    {
        if (id != item.Id)
        {
            item.Id = id;
        }

        _store.UpdateCase(id, item);
        return Ok(item);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteCase(string id)
    {
        var deleted = _store.DeleteCase(id);
        if (!deleted) return NotFound(new { message = $"Case with ID '{id}' was not found." });

        return NoContent();
    }
}
