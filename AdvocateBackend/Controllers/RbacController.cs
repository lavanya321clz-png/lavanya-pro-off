using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    private readonly AppDbContext _context;

    public RbacController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<Dictionary<string, RbacRoleDto>>> GetRbacMatrix()
    {
        var roles = await _context.RbacRoles.ToListAsync();
        var result = new Dictionary<string, RbacRoleDto>();
        foreach (var r in roles)
        {
            result[r.RoleKey] = new RbacRoleDto
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
    public async Task<IActionResult> UpdateRbacMatrix([FromBody] Dictionary<string, RbacRoleDto> matrix)
    {
        foreach (var (key, dto) in matrix)
        {
            var existing = await _context.RbacRoles.FindAsync(key);
            if (existing != null)
            {
                existing.Label = dto.Label;
                existing.Avatar = dto.Avatar;
                existing.Color = dto.Color;
                existing.Permissions = dto.Permissions;
            }
            else
            {
                _context.RbacRoles.Add(new RbacRoleItem
                {
                    RoleKey = key,
                    Label = dto.Label,
                    Avatar = dto.Avatar,
                    Color = dto.Color,
                    Permissions = dto.Permissions
                });
            }
        }

        await _context.SaveChangesAsync();
        return Ok(matrix);
    }
}
