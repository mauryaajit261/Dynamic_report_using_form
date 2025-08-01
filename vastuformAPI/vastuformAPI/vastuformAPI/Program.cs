using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using vastuformAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// Add CORS policy for frontend access to static files and API
builder.Services.AddCors(options =>
{
    options.AddPolicy("MyCorsPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // Specify the allowed origin
               .AllowAnyMethod() // Allow any HTTP method (GET, POST, etc.)
               .AllowAnyHeader() // Allow any header (including custom headers)
               .AllowCredentials() // Allow credentials (cookies, HTTP authentication)
               .SetIsOriginAllowedToAllowWildcardSubdomains(); // Optional, allows subdomains
    });
});

// Add Swagger for API documentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
// Enable CORS for the specified origin


// Serve static files like images, stylesheets, etc.
app.UseHttpsRedirection(); // Redirect HTTP to HTTPS
app.UseHttpsRedirection();

// ✅ Serve static files WITH CORS headers for Angular access
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads")),
    RequestPath = "/uploads",
    OnPrepareResponse = ctx =>
    {
        ctx.Context.Response.Headers.Append("Access-Control-Allow-Origin", "http://localhost:4200");
    }
});


// Enable authorization middleware

// Enable CORS for the specified origin
app.UseCors("MyCorsPolicy");
app.UseAuthorization();
app.MapControllers(); // Map controller routes

app.Run();
