import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
    private baseUrl = `${environment.apiBaseUrl}/api/report`;

  constructor(private router: Router, private http: HttpClient) { }


  getReport(payload: any): Observable<any> {

    let params = new HttpParams()
      .set('fromDate', payload.fromDate)
      .set('toDate', payload.toDate);

    if (payload.clientNo) {
      params = params.set('clientNo', payload.clientNo);
    }

    return this.http.get<any>(`${this.baseUrl}/latexstock`, { params });
  }
}
