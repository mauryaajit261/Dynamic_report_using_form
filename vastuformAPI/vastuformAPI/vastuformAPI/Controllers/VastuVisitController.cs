using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vastuformAPI.Data;
using vastuformAPI.Model;

namespace vastuformAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class VastuVisitController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VastuVisitController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/VastuVisit
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VastuVisit>>> GetAll()
        {
            return await _context.VastuVisits
                                 .Include(v => v.FamilyMembers)
                                 .ToListAsync();
        }

        // GET: api/VastuVisit/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VastuVisit>> Get(int id)
        {
            var visit = await _context.VastuVisits
                                      .Include(v => v.FamilyMembers)
                                      .FirstOrDefaultAsync(v => v.Id == id);

            if (visit == null)
                return NotFound();

            return visit;
        }

        // POST: api/VastuVisit
        [HttpPost]
        public async Task<ActionResult<VastuVisit>> Post([FromBody] VastuVisit visit)
        {
            _context.VastuVisits.Add(visit);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = visit.Id }, visit);
        }

        // PUT: api/VastuVisit/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, VastuVisit visit)
        {
            if (id != visit.Id)
                return BadRequest();

            _context.Entry(visit).State = EntityState.Modified;

            // Remove existing family members
            var existingMembers = _context.FamilyMembers.Where(f => f.SerialNo == id);
            _context.FamilyMembers.RemoveRange(existingMembers);

            // Add new ones
            if (visit.FamilyMembers != null)
            {
                foreach (var fm in visit.FamilyMembers)
                {
                    _context.Entry(fm).State = EntityState.Added;
                }
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/VastuVisit/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var visit = await _context.VastuVisits.FindAsync(id);
            if (visit == null)
                return NotFound();

            _context.VastuVisits.Remove(visit);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }

}
