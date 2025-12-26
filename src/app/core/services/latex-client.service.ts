import { Injectable } from '@angular/core';
import { ApiResponse, LatexClient } from '../models/latex-clients.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LatexClientService {
  private baseUrl = `${environment.apiBaseUrl}/api/latexclient`;

  constructor(private router: Router, private http: HttpClient) { }

getAllClients(): Observable<ApiResponse> {
  return this.http.get<ApiResponse>(
    `${this.baseUrl}/getallclients`
  );
}

addLatexStockIn(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add`, payload);
}

getTodayStockEntries(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/gettodayentries`);
}

updateLatexStock(data: any) {
  return this.http.put<any>(`${this.baseUrl}/update-stock`, data);
}

updateSampleDrc(id: number, payload: any) {
  return this.http.put(`${this.baseUrl}/update-sample-drc/${id}`, payload);
}


}
