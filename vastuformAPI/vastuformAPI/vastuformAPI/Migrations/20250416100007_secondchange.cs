using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace vastuformAPI.Migrations
{
    /// <inheritdoc />
    public partial class secondchange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VastuVisits",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Time = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ClientName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PinCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContactNo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BuildingName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ConstructionYear = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BuildingType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Area = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ConstructionArea = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Length = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Width = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OwnerName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BirthPlace = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BirthTime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Occupation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Qualification = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SpouseName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SpouseDateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SpouseBirthPlace = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SpouseBirthTime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SpecialIncidents = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LandShape = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LandSlope = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ClosedDirections = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OpenDirections = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NorthShiftDegree = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SurroundingRoads = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsVithishula = table.Column<bool>(type: "bit", nullable: false),
                    VithishulaDirection = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InternalArrangement = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CompoundEntry = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PlotSurroundingObservations = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Pit = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Hill = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Temple = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PublicPlace = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PlotEntryDirectionAndPada = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CompoundLengthHeight = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DirectionOfPorch = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UndergroundWaterTank = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Borewell = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StaircaseDirectionAndType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Parking = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SurroundingTrees = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LawnDirection = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Tap = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ElectricMeterAndSwitchBoard = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LivingRoom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BhavanEntry = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InternalStaircase = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Mirrors = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KitchenDetails = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StudyRoomDetails = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BedroomDetails = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LockerPrayerRoom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BathroomToilet = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SepticTankBasement = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LiftDirection = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BrahmasthanaObservations = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ToiletsLocationAndDirections = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SepticTankLocationAndDirection = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BasementLocationAndDirection = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AboutDirectionOfVastu = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LechtareAntenaValues = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DowsingReport = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VastuLandDefects = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GoodForLivingBusiness = table.Column<bool>(type: "bit", nullable: false),
                    VastuEnergy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReasonOfNegativity = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GeopathicStress = table.Column<bool>(type: "bit", nullable: false),
                    NoOfPoints = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RatnaNikshap = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TotalPositiveEnergy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TotalNegativeEnergy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Compatibility = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MicroEnergies = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FirstStepRemedy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SecondStepRemedy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FirstLineOfTreatment = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Advance = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ThirdStepRemedy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NegativeIR = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NegativeUV = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TotalPositiveOorja = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TotalNegativeOorja = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReportPreparedBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sign = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReportDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VastuVisits", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FamilyMembers",
                columns: table => new
                {
                    SerialNo = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Relation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Age = table.Column<int>(type: "int", nullable: false),
                    PresentProblem = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VastuVisitId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FamilyMembers", x => x.SerialNo);
                    table.ForeignKey(
                        name: "FK_FamilyMembers_VastuVisits_VastuVisitId",
                        column: x => x.VastuVisitId,
                        principalTable: "VastuVisits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FamilyMembers_VastuVisitId",
                table: "FamilyMembers",
                column: "VastuVisitId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FamilyMembers");

            migrationBuilder.DropTable(
                name: "VastuVisits");
        }
    }
}
