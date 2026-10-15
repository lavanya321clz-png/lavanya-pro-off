using Microsoft.AspNetCore.Mvc;
using AdvocateApi.Data;
using AdvocateApi.Models;

namespace AdvocateApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RecordsController : ControllerBase
{
    private readonly InMemoryDataStore _store;

    public RecordsController(InMemoryDataStore store)
    {
        _store = store;
    }

    [HttpGet]
    public ActionResult<IEnumerable<RecordItem>> GetRecords()
    {
        return Ok(_store.GetRecords());
    }

    [HttpGet("{id}")]
    public ActionResult<RecordItem> GetRecord(string id)
    {
        var item = _store.GetRecord(id);
        if (item == null) return NotFound();
        return Ok(item);
    }

    [HttpPost]
    public ActionResult<RecordItem> CreateRecord([FromBody] RecordItem item)
    {
        if (string.IsNullOrWhiteSpace(item.Id))
        {
            item.Id = "rec_" + DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        }

        _store.AddRecord(item);
        return CreatedAtAction(nameof(GetRecord), new { id = item.Id }, item);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateRecord(string id, [FromBody] RecordItem item)
    {
        if (id != item.Id)
        {
            item.Id = id;
        }

        _store.UpdateRecord(id, item);
        return Ok(item);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteRecord(string id)
    {
        var deleted = _store.DeleteRecord(id);
        if (!deleted) return NotFound();

        return NoContent();
    }
}
