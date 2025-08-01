
using System;
using System.Collections.Generic;
namespace vastuformAPI.Model
{

    public class VastuVisit2
    {
        public int Id { get; set; }

        // Basic Info
        public DateTime? VisitDateTime { get; set; }

        // Client Info
        public string? ClientName { get; set; }
        public string? Address { get; set; }
        public string? AreaPinCode { get; set; }
        public string? ContactNo { get; set; }
        public string? Email { get; set; }

        // Building Info
        public string? BuildingName { get; set; }
        public int? YearOfConstruction { get; set; }
        public string? BuildingType { get; set; }
        public double? TotalAreaSqFt { get; set; }
        public double? ConstructionAreaSqFt { get; set; }
        public double? Length { get; set; }
        public double? Width { get; set; }

        // Owner Info
        public string? OwnerName { get; set; }
        public DateTime? OwnerDOB { get; set; }
        public string? OwnerBirthPlace { get; set; }
        public string? OwnerBirthTime { get; set; }
        public string? Occupation { get; set; }
        public string? Qualification { get; set; }

        // Spouse Info
        public string? SpouseName { get; set; }
        public DateTime? SpouseDOB { get; set; }
        public string? SpouseBirthPlace { get; set; }
        public string? SpouseBirthTime { get; set; }

        // Family
        public List<FamilyMember1>? FamilyMembers { get; set; }

        // Vastu Details
        public string? SpecialIncident { get; set; }
        public string? ShapeOfLand { get; set; }
        public string? SlopeOfLand { get; set; }
        public string? ClosedDirections { get; set; }
        public string? OpenDirections { get; set; }
        public string? NorthDirectionShift { get; set; }
        public string? SurroundingRoads { get; set; }
        public bool? IsVithishula { get; set; }
        public string? VithishulaDirection { get; set; }
        public string? InternalArrangement { get; set; }
        public string? CompoundEntry { get; set; }
        public string? PlotSurroundingObservations { get; set; }

        // Environmental Factors
        public string? Pit { get; set; }
        public string? Hill { get; set; }
        public string? Temple { get; set; }
        public string? PublicPlace { get; set; }

        // Directions & Structure
        public string? PlotEntryDirection { get; set; }
        public string? CompoundLengthHeight { get; set; }
        public string? PorchDirection { get; set; }
        public string? UndergroundWaterTank { get; set; }
        public string? Borewell { get; set; }
        public string? StaircaseDirection { get; set; }
        public string? Parking { get; set; }
        public string? SurroundingTrees { get; set; }
        public string? LawnDirection { get; set; }
        public string? Tap { get; set; }
        public string? ElectricMeter { get; set; }

        // Rooms & Interior
        public string? LivingRoom { get; set; }
        public string? BhavanEntry { get; set; }
        public string? HouseType { get; set; }
        public string? InternalStaircase { get; set; }
        public string? Mirrors { get; set; }
        public string? Kitchen { get; set; }
        public string? Platform { get; set; }
        public string? Stove { get; set; }
        public string? Basin { get; set; }
        public string? StudyRoom { get; set; }
        public string? Bookshelf { get; set; }
        public string? Window { get; set; }
        public string? StudyTableFacing { get; set; }
        public string? Bedroom { get; set; }
        public string? BedDirection { get; set; }
        public string? SleepingDirection { get; set; }
        public string? Locker { get; set; }
        public string? PrayerRoom { get; set; }
        public string? Bathroom { get; set; }
        public string? Toilet { get; set; }
        public string? SepticTank { get; set; }
        public string? Basement { get; set; }
        public string? LiftDirection { get; set; }

        public string? BrahmasthanaObservation1 { get; set; }
        public string? BrahmasthanaObservation2 { get; set; }
        public string? BrahmasthanaObservation3 { get; set; }
        public string? BrahmasthanaObservation4 { get; set; }
        public string? BrahmasthanaObservation5 { get; set; }

        public List<ToiletDirection>? Toilets { get; set; }
        public string? SepticTankDirection { get; set; }
        public string? BasementDirection { get; set; }

        public string? OtherObservations { get; set; }

        // Lechtare Antena Readings
        public List<LechtareAntenaReading>? LechtareAntenaReadings { get; set; }

        // Dowsing & Energy
        public string? DowsingReport { get; set; }
        public string? VastuLandDefects { get; set; }
        public string? GoodFor { get; set; }
        public string? VastuEnergy { get; set; }
        public string? ShalyaDosh { get; set; }
        public string? DirectionDefect { get; set; }
        public string? LandDefect { get; set; }
        public string? VastuVibration { get; set; }
        public string? HumanEntity { get; set; }
        public string? AamanviyaVastu { get; set; }
        public string? Entity { get; set; }
        public string? Thinking { get; set; }
        public string? ReasonOfNegativity { get; set; }
        public string? GeopathicStress { get; set; }
        public int? NoOfPoints { get; set; }
        public string? RatnaNikshap { get; set; }
        public double? TotalPositiveEnergy { get; set; }
        public double? TotalNegativeEnergy { get; set; }
        public string? Compatibility { get; set; }

        // Micro Energies
        public MicroEnergies? MicroEnergies { get; set; }

        // Remedies
        public string? FirstStepRemedy { get; set; }
        public string? SecondStepRemedy { get; set; }
        public string? FirstLineTreatment { get; set; }
        public string? Advance { get; set; }
        public string? ThirdStepRemedy { get; set; }

        // UES
        public string? NegativeIR { get; set; }
        public string? NegativeUV { get; set; }
        public string? TotalPositiveOorja { get; set; }
        public string? TotalNegativeOorja { get; set; }

        // Report Footer
        public string? ReportPreparedBy { get; set; }
        public DateTime? ReportDate { get; set; }
    }

}
