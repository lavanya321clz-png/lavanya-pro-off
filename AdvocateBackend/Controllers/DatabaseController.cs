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
            database = "JSON File Persistence Store",
            mode = "Persistent JSON (No Database Required)",
            dataPath = _dataStore.DataFilePath,
            persistentFileExists = System.IO.File.Exists(_dataStore.DataFilePath),
            serverVersion = "Persistent JSON v1.1",
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
