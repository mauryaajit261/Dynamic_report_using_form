// Vastu Visit Model Interface 
export interface VastuVisit {
  id?: string;

  // Basic Details
  date: string;
  time: string;
  
  // Client Information
  clientName: string;
  contactNo: string;
  email: string;
  address: string;
  pinCode: string;
  
  // Building Information
  buildingName: string;
  buildingType: string;
  constructionYear: string;
  
  // Measurement Information
  area: string;
  constructionArea: string;
  length: string;
  width: string;
  
  // Owner Information
  ownerName: string;
  dateOfBirth: string;
  birthPlace: string;
  birthTime: string;
  occupation: string;
  qualification: string;
  spouseName?: string;
  
  // Family Members
  familyMembers?: string;
  
  // Vastu Details
  landShape?: string;
  landSlope?: string;
  eastWestLength?: string;
  northSouthLength?: string;
  regularIrregular?: string;
  extendedCutInPlot?: string;
  
  // Plot Details
  plotInternalArrangement?: string;
  observations?: string;
  
  // Surroundings
  isPitPresent?: boolean;
  isHillPresent?: boolean;
  isTemplePresent?: boolean;
  isPublicPlacePresent?: boolean;
  
  // Entry & Compound Details
  entryDirection?: string;
  compoundWallHeight?: string;
  compoundMeasurement?: string;
  
  // Water & Electrical
  waterTankDetails?: string;
  borewellPosition?: string;
  tapPosition?: string;
  electricalMeterPosition?: string;
  
  // Internal Layout
  staircaseDirection?: string;
  parkingDetails?: string;
  roomDetails?: string;
  
  // Kitchen Details
  kitchenLocation?: string;
  kitchenDetails?: string;
  
  // Room Details
  studyRoomDetails?: string;
  bedroomDetails?: string;
  otherRoomDetails?: string;
  
  // Observations
  generalObservations?: string;
  negativeObservations?: string;
  positiveObservations?: string;
  
  // Technical Data
  plotRatio?: string;
  constructionRatio?: string;
  
  // Energy and Compatibility
  energyReading?: string;
  compatibilityWithOwner?: string;
  
  // Micro Energies
  northEnergyRatio?: string;
  eastEnergyRatio?: string;
  southEnergyRatio?: string;
  westEnergyRatio?: string;
  northEastEnergyRatio?: string;
  southEastEnergyRatio?: string;
  southWestEnergyRatio?: string;
  northWestEnergyRatio?: string;
  
  // UES Readings
  uesReadingBefore?: string;
  uesReadingAfter?: string;
  
  // Dowsing Report
  dowsingReport?: string;
  
  // Land Defects
  faultyLinesPower?: string;
  blackSpotsPower?: string;
  geopathicLinesCount?: string;
  hartmanLinesCount?: string;
  curryCrossesCount?: string;
  
  // Entity Information
  humanEntities?: string;
  nonHumanEntities?: string;
  
  // Report Information
  signature?: string;
  reportDate?: string;
  submissionDate?: string;
  reportPreparedBy?: string;
  
  // Remedies
  suggestedRemedies?: string;
} 