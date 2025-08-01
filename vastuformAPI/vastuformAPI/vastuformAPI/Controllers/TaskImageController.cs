using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;
using System.Linq;
using vastuformAPI.Model;
using vastuformAPI.Data;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class TaskImageController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IWebHostEnvironment _environment;

    public TaskImageController(AppDbContext context, IWebHostEnvironment environment)
    {
        _context = context;
        _environment = environment;
    }

    // Endpoint to upload multiple images
    [HttpPost("upload")]
    public async Task<IActionResult> UploadImages([FromForm] int vastuVisitId, [FromForm] List<IFormFile> files)
    {
        var visit = await _context.VastuVisits.FindAsync(vastuVisitId);
        if (visit == null) return NotFound("VastuVisit not found");

        // Ensure WebRootPath is valid
        if (string.IsNullOrEmpty(_environment.WebRootPath))
        {
            return BadRequest("WebRootPath is not configured correctly.");
        }

        var uploadPath = Path.Combine(_environment.WebRootPath, "uploads");

        // Ensure that the uploads folder exists
        if (!Directory.Exists(uploadPath))
        {
            Directory.CreateDirectory(uploadPath);
        }

        foreach (var file in files)
        {
            if (file.Length > 0)
            {
                // Ensure that file name is not null or empty
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                if (string.IsNullOrEmpty(fileName))
                {
                    return BadRequest("File name generation failed.");
                }

                var filePath = Path.Combine(uploadPath, fileName);

                // Ensure filePath is valid before using
                if (string.IsNullOrEmpty(filePath))
                {
                    return BadRequest("File path is not valid.");
                }

                // Save the file to the server
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // Save the file path to the database
                var image = new TaskImage
                {
                    VastuVisitId = vastuVisitId,
                    ImagePath = Path.Combine("uploads", fileName) // Save relative path in database
                };

                _context.TaskImages.Add(image);
            }
        }

        // Save the changes to the database
        await _context.SaveChangesAsync();
        return Ok("Images uploaded successfully.");
    }

    // Endpoint to get all images for a VastuVisit
    [HttpGet("{vastuVisitId}")]
    public async Task<IActionResult> GetImages(int vastuVisitId)
    {
        var images = await _context.TaskImages
            .Where(img => img.VastuVisitId == vastuVisitId)
            .ToListAsync();

        var baseUrl = $"{Request.Scheme}://{Request.Host}"; // Get base URL dynamically
        foreach (var image in images)
        {
            image.ImagePath = Path.Combine(baseUrl, "uploads", Path.GetFileName(image.ImagePath)); // Combine the base URL with the path
        }

        return Ok(images);
    }

}
