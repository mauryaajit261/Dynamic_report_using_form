namespace vastuformAPI.Model
{
    public class VastuVisit
    {
        public int Id { get; set; }

        // Basic Visit Information
        public Nullable<DateTime> Date { get; set; }
        public string Time { get; set; }

        // Client & Property Details
        public string ClientName { get; set; }
        public string Address { get; set; }
        public string PinCode { get; set; }
        public string ContactNo { get; set; }
        public string Email { get; set; }
        public string BuildingName { get; set; }
        public string ConstructionYear { get; set; }
        public string BuildingType { get; set; }
        public string Area { get; set; }
        public string ConstructionArea { get; set; }
        public string Length { get; set; }
        public string Width { get; set; }
        public string OwnerName { get; set; }

        // Client Personal Details
        public Nullable<DateTime> DateOfBirth { get; set; }
        public string BirthPlace { get; set; }
        public string BirthTime { get; set; }
        public string Occupation { get; set; }
        public string Qualification { get; set; }
        public string SpouseName { get; set; }
        public Nullable<DateTime> SpouseDateOfBirth { get; set; }
        public string SpouseBirthPlace { get; set; }
        public string SpouseBirthTime { get; set; }

        // Family Member Details
        public List<FamilyMember> FamilyMembers { get; set; } = new();

        // Vastu and Structure Observations
        public string SpecialIncidents { get; set; }
        public string LandShape { get; set; }
        public string LandSlope { get; set; }
        public string ClosedDirections { get; set; }
        public string OpenDirections { get; set; }
        public string NorthShiftDegree { get; set; }
        public string SurroundingRoads { get; set; }
        public bool IsVithishula { get; set; }
        public string VithishulaDirection { get; set; }
        public string InternalArrangement { get; set; }
        public string CompoundEntry { get; set; }
        public string PlotSurroundingObservations { get; set; }

        // Structural Elements
        public string Pit { get; set; }
        public string Hill { get; set; }
        public string Temple { get; set; }
        public string PublicPlace { get; set; }
        public string PlotEntryDirectionAndPada { get; set; }
        public string CompoundLengthHeight { get; set; }
        public string DirectionOfPorch { get; set; }
        public string UndergroundWaterTank { get; set; }
        public string Borewell { get; set; }
        public string StaircaseDirectionAndType { get; set; }
        public string Parking { get; set; }
        public string SurroundingTrees { get; set; }
        public string LawnDirection { get; set; }
        public string Tap { get; set; }
        public string ElectricMeterAndSwitchBoard { get; set; }
        public string LivingRoom { get; set; }
        public string BhavanEntry { get; set; }
        public string InternalStaircase { get; set; }
        public string Mirrors { get; set; }
        public string KitchenDetails { get; set; }
        public string StudyRoomDetails { get; set; }
        public string BedroomDetails { get; set; }
        public string LockerPrayerRoom { get; set; }
        public string BathroomToilet { get; set; }
        public string SepticTankBasement { get; set; }
        public string LiftDirection { get; set; }
        public string BrahmasthanaObservations { get; set; }
        public string ToiletsLocationAndDirections { get; set; }
        public string SepticTankLocationAndDirection { get; set; }
        public string BasementLocationAndDirection { get; set; }
        public string AboutDirectionOfVastu { get; set; }
        public string LechtareAntenaValues { get; set; }

        // Reports and Observations
        public string DowsingReport { get; set; }
        public string VastuLandDefects { get; set; }
        public bool GoodForLivingBusiness { get; set; }
        public string VastuEnergy { get; set; }
        public string ReasonOfNegativity { get; set; }
        public bool GeopathicStress { get; set; }
        public string NoOfPoints { get; set; }
        public string RatnaNikshap { get; set; }
        public string TotalPositiveEnergy { get; set; }
        public string TotalNegativeEnergy { get; set; }
        public string Compatibility { get; set; }
        public string MicroEnergies { get; set; }

        // Remedies
        public string FirstStepRemedy { get; set; }
        public string SecondStepRemedy { get; set; }
        public string FirstLineOfTreatment { get; set; }
        public string Advance { get; set; }
        public string ThirdStepRemedy { get; set; }

        // UES Values
        public string NegativeIR { get; set; }
        public string NegativeUV { get; set; }
        public string TotalPositiveOorja { get; set; }
        public string TotalNegativeOorja { get; set; }

        // Final Report
        public string ReportPreparedBy { get; set; }
        public string Sign { get; set; }
        public Nullable<DateTime> ReportDate { get; set; }

        // New added property to reference images
        public List<TaskImage> Images { get; set; } = new();
    }

}
