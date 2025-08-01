using System.Text.Json.Serialization;

namespace vastuformAPI.Model
{
    public class LechtareAntenaReading
    {
        public int Id { get; set; }
        public double? Value { get; set; }

        public int? VastuVisitId { get; set; }

        [JsonIgnore]
        public VastuVisit2? VastuVisit2 { get; set; }
    }

}
