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
        foreach (var (key, dto) in matrix)
        {
            var existing = _store.GetRbacRole(key);
            if (existing != null)
            {
                existing.Label = dto.Label;
                existing.Avatar = dto.Avatar;
                existing.Color = dto.Color;
                existing.Permissions = dto.Permissions;
            }
            else
            {
                _store.SetRbacRole(key, new RbacRoleItem
                {
                    RoleKey = key,
                    Label = dto.Label,
                    Avatar = dto.Avatar,
                    Color = dto.Color,
                    Permissions = dto.Permissions
                });
            }
        }

        return Ok(matrix);
    }
}
