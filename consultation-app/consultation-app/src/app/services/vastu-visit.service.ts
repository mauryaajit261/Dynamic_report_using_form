import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FamilyMember {
  serialNo: number;
  name: string;
  relation: string;
  age: number;
  presentProblem: string;
}

export interface VastuVisit {
  id: number;  // Changed from string to number
  
  date: string;
  time: string;
  clientName: string;
  address: string;
  pinCode: string;
  contactNo: string;
  email: string;
  buildingName: string;
  constructionYear: string;
  buildingType: string;
  area: string;
  constructionArea: string;
  length: string;
  width: string;
  ownerName: string;
  dateOfBirth: string;
  birthPlace: string;
  birthTime: string;
  occupation: string;
  qualification: string;
  spouseName: string;
  spouseDateOfBirth: string;
  spouseBirthPlace: string;
  spouseBirthTime: string;
  familyMembers: FamilyMember[];

  specialIncidents: string;
  landShape: string;
  landSlope: string;
  closedDirections: string;
  openDirections: string;
  northShiftDegree: string;
  surroundingRoads: string;
  isVithishula: boolean;
  vithishulaDirection: string;
  internalArrangement: string;
  compoundEntry: string;
  plotSurroundingObservations: string;

  pit: string;
  hill: string;
  temple: string;
  publicPlace: string;
  plotEntryDirectionAndPada: string;
  compoundLengthHeight: string;
  directionOfPorch: string;
  undergroundWaterTank: string;
  borewell: string;
  staircaseDirectionAndType: string;
  parking: string;
  surroundingTrees: string;
  lawnDirection: string;
  tap: string;
  electricMeterAndSwitchBoard: string;
  livingRoom: string;
  bhavanEntry: string;
  internalStaircase: string;
  mirrors: string;
  kitchenDetails: string;
  studyRoomDetails: string;
  bedroomDetails: string;
  lockerPrayerRoom: string;
  bathroomToilet: string;
  septicTankBasement: string;
  liftDirection: string;
  brahmasthanaObservations: string;
  toiletsLocationAndDirections: string;
  septicTankLocationAndDirection: string;
  basementLocationAndDirection: string;
  aboutDirectionOfVastu: string;
  lechtareAntenaValues: string;

  dowsingReport: string;
  vastuLandDefects: string;
  goodForLivingBusiness: boolean;
  vastuEnergy: string;
  reasonOfNegativity: string;
  geopathicStress: boolean;
  noOfPoints: string;
  ratnaNikshap: string;
  totalPositiveEnergy: string;
  totalNegativeEnergy: string;
  compatibility: string;
  microEnergies: string;

  firstStepRemedy: string;
  secondStepRemedy: string;
  firstLineOfTreatment: string;
  advance: string;
  thirdStepRemedy: string;

  negativeIR: string;
  negativeUV: string;
  totalPositiveOorja: string;
  totalNegativeOorja: string;

  reportPreparedBy: string;
  sign: string;
  reportDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class VastuVisitService {
  private apiUrl = 'http://localhost:5206/api/VastuVisit'; // <-- Update your actual backend URL

  constructor(private http: HttpClient) {}

  getAllVisits(): Observable<VastuVisit[]> {
    return this.http.get<VastuVisit[]>(this.apiUrl);
  }

  getVisitById(id: number): Observable<VastuVisit> {
    return this.http.get<VastuVisit>(`${this.apiUrl}/${id}`);
  }

  createVisit(visit: VastuVisit): Observable<VastuVisit> {
    console.log(visit);
    return this.http.post<VastuVisit>(this.apiUrl, visit);
    
  }

  updateVisit(id: number, visit: VastuVisit): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, visit);
  }

  deleteVisit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
