// Angular Service: vastuvisit2.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VastuVisit2Service {
  private baseUrl = 'https://localhost:7020/api/VaastuVisit2';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  generateReport(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${id}/report`, { responseType: 'blob' });
  }

  sendReport(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/${id}/sendReport`, {});
  }
}
