using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vastuformAPI.Data;
using vastuformAPI.Model;

namespace vastuformAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VastuEnergyController : ControllerBase
    {

        private readonly AppDbContext _context;

        public VastuEnergyController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<VastuEnergy>>> GetForms()
        {
            return await _context.VastuEnergytb.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<VastuEnergy>> GetForm(int id)
        {
            var form = await _context.VastuEnergytb.FindAsync(id);
            if (form == null)
            {
                return NotFound();
            }
            return form;
        }

        [HttpPost]
        public async Task<ActionResult<VastuEnergy>> PostForm(VastuEnergy form)
        {
            _context.VastuEnergytb.Add(form);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetForm), new { id = form.Id }, form);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutConsultation(int id, VastuEnergy form)
        {
            if (id != form.Id)
            {
                return BadRequest();
            }

            _context.Entry(form).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!formExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteForm(int id)
        {
            var form = await _context.VastuEnergytb.FindAsync(id);
            if (form == null)
            {
                return NotFound();
            }

            _context.VastuEnergytb.Remove(form);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool formExists(int id)
        {
            return _context.VastuEnergytb.Any(e => e.Id == id);
        }
    }
}
