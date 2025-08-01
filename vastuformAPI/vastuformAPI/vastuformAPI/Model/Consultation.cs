using System;
using System.ComponentModel.DataAnnotations;

namespace vastuformAPI.Model
{
    public class Consultation
    {
        public int Id { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "Name can't be longer than 100 characters.")]
        public string Name { get; set; }

        [Required]
        [StringLength(255, ErrorMessage = "Address can't be longer than 255 characters.")]
        public string Address { get; set; }

        [Required]
        [RegularExpression("^[0-9]{6}$", ErrorMessage = "Pincode must be 6 digits.")]
        public string Pincode { get; set; }

        [Required]
        [RegularExpression("^[0-9]{10}$", ErrorMessage = "Contact number must be 10 digits.")]
        public string ContactNo { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        public string Email { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        [StringLength(500, ErrorMessage = "Questions can't be longer than 500 characters.")]
        public string Questions { get; set; }

        [Required]
        [StringLength(500, ErrorMessage = "Problem can't be longer than 500 characters.")]
        public string Problem { get; set; }

        // Chakra & Energy Fields
        public string SahasaraChakra { get; set; }
        public string AjnaChakra { get; set; }
        public string VishuddhaChakra { get; set; }
        public string AnahatChakra { get; set; }
        public string ManipuraChakra { get; set; }
        public string SvaddhisthanaChakra { get; set; }
        public string MuldharaChakra { get; set; }
        public string AuraEnergy { get; set; }
        public string BodyAuraPercentage { get; set; }

        // Recommendations
        public string LuckyColor { get; set; }
        public string LuckyNumber { get; set; }
        public string ColorToAvoid { get; set; }
        public string NumberToAvoid { get; set; }
        public string Personality { get; set; }
        public string Gemstone { get; set; }
        public string Crystal { get; set; }
        public string OorjaLiquid { get; set; }
        public string Soap { get; set; }
        public string Salt { get; set; }
        public string AnyOther { get; set; }

        [StringLength(1000, ErrorMessage = "Observations and remedies can't be longer than 1000 characters.")]
        public string ObservationsAndRemedies { get; set; }
    }
}
