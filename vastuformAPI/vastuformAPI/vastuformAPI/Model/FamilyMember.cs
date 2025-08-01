using System.ComponentModel.DataAnnotations;

namespace vastuformAPI.Model
{
    public class FamilyMember
    {
             [Key]
            public int SerialNo { get; set; }
            public string Name { get; set; }
            public string Relation { get; set; }
            public int Age { get; set; }
            public string PresentProblem { get; set; }
        

    }
}
