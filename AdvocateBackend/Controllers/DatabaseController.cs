using Microsoft.AspNetCore.Mvc;
using AdvocateApi.Data;

namespace AdvocateApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DatabaseController : ControllerBase
{
    private readonly InMemoryDataStore _dataStore;

    public DatabaseController(InMemoryDataStore dataStore)
    {
        _dataStore = dataStore;
    }

    [HttpGet("status")]
    public IActionResult GetStatus()
    {
        return Ok(new
        {
            connected = true,
            database = "In-Memory Mock Store",
            mode = "Standalone Web API (No Database Required)",
            serverVersion = "Standalone In-Memory v1.0",
            schema = "None",
            timestamp = DateTime.UtcNow,
            counts = new
            {
                cases = _dataStore.CasesCount,
                clients = _dataStore.ClientsCount,
                appointments = _dataStore.AppointmentsCount,
                tasks = _dataStore.TasksCount,
                records = _dataStore.RecordsCount,
                users = _dataStore.UsersCount
            }
        });
    }
}
