import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface VastuEnergyScan {
  id: number;
  date: string;
  name: string;
  dateOfBirth: string;
  contactNo: string;
  email: string;
  address: string;
  healthIssues: string;
  // Chakra Energy Readings
  sahasaraChakra: string;
  ajnaChakra: string;
  vishuddhaChakra: string;
  anahatChakra: string;
  manipuraChakra: string;
  svaddhisthanaChakra: string;
  muldharaChakra: string;
  // Aura Details
  auraEnergy: string;
  auraLength: string;
  // Consultant Info
  consultantName: string;
  officeAddress: string;
  contactNos: string;
}

@Injectable({
  providedIn: 'root'
})
export class VastuEnergyScanService {
  private apiUrl = 'http://localhost:5206/api/VastuEnergy'; // Update with actual API base URL

  constructor(private http: HttpClient) {}

  getScans(): Observable<VastuEnergyScan[]> {
    return this.http.get<VastuEnergyScan[]>(this.apiUrl);
  }

  getScanById(id: number): Observable<VastuEnergyScan> {
    return this.http.get<VastuEnergyScan>(`${this.apiUrl}/${id}`);
  }

  addScan(scan: VastuEnergyScan): Observable<VastuEnergyScan> {
    return this.http.post<VastuEnergyScan>(this.apiUrl, scan);
  }

  updateScan(scan: VastuEnergyScan): Observable<any> {
    return this.http.put(`${this.apiUrl}/${scan.id}`, scan);
  }

  deleteScan(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
