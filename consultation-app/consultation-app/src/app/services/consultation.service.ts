import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Consultation {
  id: number;
  date: string;  // Will be converted to DateTime in backend
  name: string;
  address: string;
  pincode: string;
  contactNo: string;
  email: string;
  dateOfBirth: string;  // Will be converted to DateTime in backend
  questions: string;
  problem: string;
  sahasaraChakra: string;
  ajnaChakra: string;
  vishuddhaChakra: string;
  anahatChakra: string;
  manipuraChakra: string;
  svaddhisthanaChakra: string;
  muldharaChakra: string;
  auraEnergy: string;
  bodyAuraPercentage: string;
  luckyColor: string;
  luckyNumber: string;
  colorToAvoid: string;
  numberToAvoid: string;
  personality: string;
  gemstone: string;
  crystal: string;
  oorjaLiquid: string;
  soap: string;
  salt: string;
  anyOther: string;
  observationsAndRemedies: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  private apiUrl = 'http://localhost:5206/api/Consultation';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
    withCredentials: true
  };

  constructor(private http: HttpClient) {}

  getConsultations(): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(this.apiUrl, this.httpOptions).pipe(
      catchError(error => {
        console.error('Error fetching consultations:', error);
        if (error.status === 0) {
          console.error('Backend server is not running or not accessible');
        } else if (error.status === 404) {
          console.error('API endpoint not found');
        } else if (error.status === 500) {
          console.error('Server error occurred');
        }
        return throwError(() => error);
      })
    );
  }

  getConsultationById(id: number): Observable<Consultation> {
    return this.http.get<Consultation>(`${this.apiUrl}/${id}`, this.httpOptions);
  }

  addConsultation(consultation: Consultation): Observable<Consultation> {
    try {
      // Format the data to match backend expectations
      const formattedData = {
        ...consultation,
        // Ensure dates are properly formatted as ISO strings
        date: consultation.date ? new Date(consultation.date).toISOString() : new Date().toISOString(),
        dateOfBirth: consultation.dateOfBirth ? new Date(consultation.dateOfBirth).toISOString() : new Date().toISOString(),
        // Ensure string fields are properly formatted
        name: (consultation.name || '').trim(),
        address: (consultation.address || '').trim(),
        pincode: (consultation.pincode || '').trim(),
        contactNo: (consultation.contactNo || '').trim(),
        email: (consultation.email || '').trim(),
        questions: (consultation.questions || '').trim(),
        problem: (consultation.problem || '').trim(),
        sahasaraChakra: (consultation.sahasaraChakra || '').trim(),
        ajnaChakra: (consultation.ajnaChakra || '').trim(),
        vishuddhaChakra: (consultation.vishuddhaChakra || '').trim(),
        anahatChakra: (consultation.anahatChakra || '').trim(),
        manipuraChakra: (consultation.manipuraChakra || '').trim(),
        svaddhisthanaChakra: (consultation.svaddhisthanaChakra || '').trim(),
        muldharaChakra: (consultation.muldharaChakra || '').trim(),
        auraEnergy: (consultation.auraEnergy || '').trim(),
        bodyAuraPercentage: (consultation.bodyAuraPercentage || '').trim(),
        luckyColor: (consultation.luckyColor || '').trim(),
        luckyNumber: (consultation.luckyNumber || '').trim(),
        colorToAvoid: (consultation.colorToAvoid || '').trim(),
        numberToAvoid: (consultation.numberToAvoid || '').trim(),
        personality: (consultation.personality || '').trim(),
        gemstone: (consultation.gemstone || '').trim(),
        crystal: (consultation.crystal || '').trim(),
        oorjaLiquid: (consultation.oorjaLiquid || '').trim(),
        soap: (consultation.soap || '').trim(),
        salt: (consultation.salt || '').trim(),
        anyOther: (consultation.anyOther || '').trim(),
        observationsAndRemedies: (consultation.observationsAndRemedies || '').trim()
      };

      console.log('Sending formatted consultation data:', JSON.stringify(formattedData, null, 2));
      
      return this.http.post<Consultation>(this.apiUrl, formattedData, this.httpOptions).pipe(
        catchError(error => {
          console.error('Error adding consultation:', error);
          console.error('Request details:', {
            url: this.apiUrl,
            method: 'POST',
            data: formattedData,
            headers: this.httpOptions.headers
          });
          
          if (error.status === 0) {
            console.error('Backend server is not running or not accessible');
            return throwError(() => new Error('Backend server is not running or not accessible'));
          } else if (error.status === 400) {
            console.error('Bad request - check the data being sent:', formattedData);
            console.error('Validation errors:', error.error);
            return throwError(() => new Error('Invalid data: ' + JSON.stringify(error.error)));
          } else if (error.status === 500) {
            console.error('Server error occurred');
            console.error('Server response:', error.error);
            return throwError(() => new Error('Server error: ' + JSON.stringify(error.error)));
          }
          return throwError(() => error);
        })
      );
    } catch (error) {
      console.error('Error in addConsultation:', error);
      return throwError(() => error);
    }
  }

  updateConsultation(id: number, consultation: Consultation): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, consultation, this.httpOptions);
  }

  deleteConsultation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.httpOptions);
  }
}
