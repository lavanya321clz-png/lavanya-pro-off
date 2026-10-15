using Microsoft.AspNetCore.Mvc;
using AdvocateApi.Data;
using AdvocateApi.Models;

namespace AdvocateApi.Controllers;

public class RbacRoleDto
{
    public string Label { get; set; } = string.Empty;
    public string Avatar { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
    public Dictionary<string, bool> Permissions { get; set; } = new();
}

[ApiController]
[Route("api/[controller]")]
public class RbacController : ControllerBase
{
    private readonly InMemoryDataStore _store;

    public RbacController(InMemoryDataStore store)
    {
        _store = store;
    }

    [HttpGet]
    public ActionResult<Dictionary<string, RbacRoleDto>> GetRbacMatrix()
    {
        var roles = _store.GetRbacRoles();
        var result = new Dictionary<string, RbacRoleDto>();
        foreach (var (key, r) in roles)
        {
            result[key] = new RbacRoleDto
            {
                Label = r.Label,
                Avatar = r.Avatar,
                Color = r.Color,
                Permissions = r.Permissions ?? new Dictionary<string, bool>()
            };
        }
        return Ok(result);
    }

    [HttpPut]
    public IActionResult UpdateRbacMatrix([FromBody] Dictionary<string, RbacRoleDto> matrix)
    {
        _store.UpdateRbacMatrix(matrix);
        return Ok(matrix);
    }
}
