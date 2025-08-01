using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
namespace vastuformAPI.Model
{

    public class TaskImage
    {
        public int Id { get; set; }

        // Path to the image in your server
        public string ImagePath { get; set; }

        // Reference to VastuVisit
        public int VastuVisitId { get; set; }
        public VastuVisit VastuVisit { get; set; }
    }
}
