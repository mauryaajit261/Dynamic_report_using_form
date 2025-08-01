using System.ComponentModel.DataAnnotations;

namespace vastuformAPI.Model
{
    public class VastuEnergy
    {

        [Key]
        public int Id { get; set; }
        public string Date { get; set; }
        public string Name { get; set; }
        public string DateOfBirth { get; set; }
        public string ContactNo { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string HealthIssues { get; set; }

        // Chakra Energy Readings
        public string SahasaraChakra { get; set; }
        public string AjnaChakra { get; set; }
        public string VishuddhaChakra { get; set; }
        public string AnahatChakra { get; set; }
        public string ManipuraChakra { get; set; }
        public string SvaddhisthanaChakra { get; set; }
        public string MuldharaChakra { get; set; }

        // Aura Details
        public string AuraEnergy { get; set; }
        public string AuraLength { get; set; }

        // Consultant Info
        public string ConsultantName { get; set; }
        public string OfficeAddress { get; set; }
        public string ContactNos { get; set; }
    }
}
