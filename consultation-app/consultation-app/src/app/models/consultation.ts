export interface Consultation {
  id?: string;
  date: string;
  name: string;
  address: string;
  pincode: number;
  contactNo: number;
  email: string;
  dateOfBirth: string;
  questions: string;
  problem: string;
  
  // Official fields
  sahasaraChakra?: string;
  ajnaChakra?: string;
  vishuddhaChakra?: string;
  anahatChakra?: string;
  manipuraChakra?: string;
  svaddhisthanaChakra?: string;
  muldharaChakra?: string;
  auraEnergy?: string;
  bodyAuraPercentage?: number;
  luckyColor?: string;
  luckyNumber?: number;
  colorToAvoid?: string;
  numberToAvoid?: number;
  personality?: string;
  gemstone?: string;
  crystal?: string;
  oorjaLiquid?: string;
  soap?: string;
  salt?: string;
  anyOther?: string;
  observationsAndRemedies?: string;
}
