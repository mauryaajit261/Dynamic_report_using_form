using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace vastuformAPI.Migrations
{
    /// <inheritdoc />
    public partial class initial3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VastuEnergytb",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfBirth = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContactNo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HealthIssues = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SahasaraChakra = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AjnaChakra = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VishuddhaChakra = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AnahatChakra = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ManipuraChakra = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SvaddhisthanaChakra = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MuldharaChakra = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AuraEnergy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AuraLength = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ConsultantName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OfficeAddress = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContactNos = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VastuEnergytb", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VastuEnergytb");
        }
    }
}
