using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vastuformAPI.Data;
using vastuformAPI.Model;

namespace vastuformAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VaastuVisit2Controller : ControllerBase
    {

        private readonly AppDbContext _context;

        public VaastuVisit2Controller(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/VastuVisit
        [HttpPost]
        public async Task<IActionResult> AddVastuVisit([FromBody] VastuVisit2 model)
        {
            _context.VastuVisits2.Add(model);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Vastu Visit saved successfully", id = model.Id });
        }

        // GET: api/VastuVisit
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var visits = await _context.VastuVisits2
                .Include(v => v.FamilyMembers)
                .Include(v => v.Toilets)
                .Include(v => v.LechtareAntenaReadings)
                .Include(v => v.MicroEnergies)
                .ToListAsync();

            return Ok(visits);
        }

        // GET: api/VastuVisit/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var visit = await _context.VastuVisits2
                .Include(v => v.FamilyMembers)
                .Include(v => v.Toilets)
                .Include(v => v.LechtareAntenaReadings)
                .Include(v => v.MicroEnergies)
                .FirstOrDefaultAsync(v => v.Id == id);

            if (visit == null)
                return NotFound();

            return Ok(visit);
        }

        // PUT: api/VastuVisit/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVastuVisit(int id, [FromBody] VastuVisit2 updatedVisit)
        {
            var existingVisit = await _context.VastuVisits2
                .Include(v => v.FamilyMembers)
                .Include(v => v.Toilets)
                .Include(v => v.LechtareAntenaReadings)
                .Include(v => v.MicroEnergies)
                .FirstOrDefaultAsync(v => v.Id == id);

            if (existingVisit == null)
                return NotFound();

            // Replace scalar properties
            _context.Entry(existingVisit).CurrentValues.SetValues(updatedVisit);

            // Optionally remove & re-add nested collections (safe way)
            _context.FamilyMembers1.RemoveRange(existingVisit.FamilyMembers);
            _context.ToiletDirections.RemoveRange(existingVisit.Toilets);
            _context.LechtareAntenaReadings.RemoveRange(existingVisit.LechtareAntenaReadings);

            existingVisit.FamilyMembers = updatedVisit.FamilyMembers;
            existingVisit.Toilets = updatedVisit.Toilets;
            existingVisit.LechtareAntenaReadings = updatedVisit.LechtareAntenaReadings;
            existingVisit.MicroEnergies = updatedVisit.MicroEnergies;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Vastu Visit updated successfully" });
        }

        // DELETE: api/VastuVisit/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVastuVisit(int id)
        {
            var visit = await _context.VastuVisits2
                .Include(v => v.FamilyMembers)
                .Include(v => v.Toilets)
                .Include(v => v.LechtareAntenaReadings)
                .Include(v => v.MicroEnergies)
                .FirstOrDefaultAsync(v => v.Id == id);

            if (visit == null)
                return NotFound();

            _context.VastuVisits2.Remove(visit);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Vastu Visit deleted successfully" });
        }

    }
}
