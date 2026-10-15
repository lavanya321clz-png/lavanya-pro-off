using System.Text.Json;
using AdvocateApi.Data;

var builder = WebApplication.CreateBuilder(args);

// Register In-Memory Data Store as a Singleton service (No Database Required)
builder.Services.AddSingleton<InMemoryDataStore>();

// Enable CORS for frontend Vite React app
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.Configure<RouteOptions>(options =>
{
    options.LowercaseUrls = true;
    options.LowercaseQueryStrings = true;
});

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Initialize In-Memory Data Store from seedData.json (standalone without database)
var dataStore = app.Services.GetRequiredService<InMemoryDataStore>();
var env = app.Services.GetRequiredService<IWebHostEnvironment>();
var logger = app.Services.GetRequiredService<ILogger<Program>>();
dataStore.Initialize(env.ContentRootPath, logger);

// Configure HTTP request pipeline
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Advocate Backend API v1");
});

// Map root "/" to redirect to Swagger UI so opening http://localhost:5052/ never shows 404
app.MapGet("/", () => Results.Redirect("/swagger"));

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();
