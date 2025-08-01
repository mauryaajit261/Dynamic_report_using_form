using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace vastuformAPI.Migrations
{
    /// <inheritdoc />
    public partial class thirdchange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FamilyMembers_VastuVisits_VastuVisitId",
                table: "FamilyMembers");

            migrationBuilder.CreateTable(
                name: "VastuVisits2",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VisitDateTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ClientName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AreaPinCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ContactNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BuildingName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    YearOfConstruction = table.Column<int>(type: "int", nullable: true),
                    BuildingType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalAreaSqFt = table.Column<double>(type: "float", nullable: true),
                    ConstructionAreaSqFt = table.Column<double>(type: "float", nullable: true),
                    Length = table.Column<double>(type: "float", nullable: true),
                    Width = table.Column<double>(type: "float", nullable: true),
                    OwnerName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OwnerDOB = table.Column<DateTime>(type: "datetime2", nullable: true),
                    OwnerBirthPlace = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OwnerBirthTime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Occupation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Qualification = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SpouseName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SpouseDOB = table.Column<DateTime>(type: "datetime2", nullable: true),
                    SpouseBirthPlace = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SpouseBirthTime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SpecialIncident = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ShapeOfLand = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SlopeOfLand = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClosedDirections = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OpenDirections = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NorthDirectionShift = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SurroundingRoads = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsVithishula = table.Column<bool>(type: "bit", nullable: true),
                    VithishulaDirection = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InternalArrangement = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CompoundEntry = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PlotSurroundingObservations = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Pit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Hill = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Temple = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PublicPlace = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PlotEntryDirection = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CompoundLengthHeight = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PorchDirection = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UndergroundWaterTank = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Borewell = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StaircaseDirection = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Parking = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SurroundingTrees = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LawnDirection = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Tap = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ElectricMeter = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LivingRoom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BhavanEntry = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HouseType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InternalStaircase = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Mirrors = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Kitchen = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Platform = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Stove = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Basin = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StudyRoom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Bookshelf = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Window = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StudyTableFacing = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Bedroom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BedDirection = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SleepingDirection = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Locker = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PrayerRoom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Bathroom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Toilet = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SepticTank = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Basement = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LiftDirection = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BrahmasthanaObservation1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BrahmasthanaObservation2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BrahmasthanaObservation3 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BrahmasthanaObservation4 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BrahmasthanaObservation5 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SepticTankDirection = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BasementDirection = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OtherObservations = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DowsingReport = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VastuLandDefects = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GoodFor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VastuEnergy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ShalyaDosh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DirectionDefect = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LandDefect = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VastuVibration = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HumanEntity = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AamanviyaVastu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Entity = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Thinking = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReasonOfNegativity = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GeopathicStress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NoOfPoints = table.Column<int>(type: "int", nullable: true),
                    RatnaNikshap = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalPositiveEnergy = table.Column<double>(type: "float", nullable: true),
                    TotalNegativeEnergy = table.Column<double>(type: "float", nullable: true),
                    Compatibility = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FirstStepRemedy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecondStepRemedy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FirstLineTreatment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Advance = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ThirdStepRemedy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NegativeIR = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NegativeUV = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalPositiveOorja = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalNegativeOorja = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReportPreparedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReportDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VastuVisits2", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FamilyMembers1",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Relation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Age = table.Column<int>(type: "int", nullable: true),
                    PresentProblem = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VastuVisit2Id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FamilyMembers1", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FamilyMembers1_VastuVisits2_VastuVisit2Id",
                        column: x => x.VastuVisit2Id,
                        principalTable: "VastuVisits2",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LechtareAntenaReadings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Value = table.Column<double>(type: "float", nullable: true),
                    VastuVisitId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LechtareAntenaReadings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LechtareAntenaReadings_VastuVisits2_VastuVisitId",
                        column: x => x.VastuVisitId,
                        principalTable: "VastuVisits2",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MicroEnergies",
                columns: table => new
                {
                    VastuVisit2Id = table.Column<int>(type: "int", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false),
                    MoneyAttraction = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Jealousy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Prosperity = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Harmony = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Happiness = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Annapurna = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Health = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CustomerAttraction = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProgenyIncrease = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CustomerSatisfaction = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProgenyHappiness = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MarriageLifeHappiness = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MicroEnergies", x => x.VastuVisit2Id);
                    table.ForeignKey(
                        name: "FK_MicroEnergies_VastuVisits2_VastuVisit2Id",
                        column: x => x.VastuVisit2Id,
                        principalTable: "VastuVisits2",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ToiletDirections",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Direction = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VastuVisit2Id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ToiletDirections", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ToiletDirections_VastuVisits2_VastuVisit2Id",
                        column: x => x.VastuVisit2Id,
                        principalTable: "VastuVisits2",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FamilyMembers1_VastuVisit2Id",
                table: "FamilyMembers1",
                column: "VastuVisit2Id");

            migrationBuilder.CreateIndex(
                name: "IX_LechtareAntenaReadings_VastuVisitId",
                table: "LechtareAntenaReadings",
                column: "VastuVisitId");

            migrationBuilder.CreateIndex(
                name: "IX_ToiletDirections_VastuVisit2Id",
                table: "ToiletDirections",
                column: "VastuVisit2Id");

            migrationBuilder.AddForeignKey(
                name: "FK_FamilyMembers_VastuVisits_VastuVisitId",
                table: "FamilyMembers",
                column: "VastuVisitId",
                principalTable: "VastuVisits",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FamilyMembers_VastuVisits_VastuVisitId",
                table: "FamilyMembers");

            migrationBuilder.DropTable(
                name: "FamilyMembers1");

            migrationBuilder.DropTable(
                name: "LechtareAntenaReadings");

            migrationBuilder.DropTable(
                name: "MicroEnergies");

            migrationBuilder.DropTable(
                name: "ToiletDirections");

            migrationBuilder.DropTable(
                name: "VastuVisits2");

            migrationBuilder.AddForeignKey(
                name: "FK_FamilyMembers_VastuVisits_VastuVisitId",
                table: "FamilyMembers",
                column: "VastuVisitId",
                principalTable: "VastuVisits",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
