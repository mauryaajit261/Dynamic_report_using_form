using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace vastuformAPI.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Consultations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Pincode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContactNo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Questions = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Problem = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SahasaraChakra = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AjnaChakra = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VishuddhaChakra = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AnahatChakra = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ManipuraChakra = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SvaddhisthanaChakra = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MuldharaChakra = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AuraEnergy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BodyAuraPercentage = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LuckyColor = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LuckyNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ColorToAvoid = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NumberToAvoid = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Personality = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Gemstone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Crystal = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OorjaLiquid = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Soap = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Salt = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AnyOther = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ObservationsAndRemedies = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Consultations", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Consultations");
        }
    }
}
