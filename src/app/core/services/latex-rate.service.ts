import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LatexRate } from '../models/latex-rate.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LatexRateService {

    private baseUrl = `${environment.apiBaseUrl}/api/MasterData`;

  constructor(private http: HttpClient) {}

  addRate(rate: LatexRate): Observable<any> {
    return this.http.post(`${this.baseUrl}/add-latex-rate`, rate);
  }

  getLast10Rates(): Observable<LatexRate[]> {
    return this.http.get<LatexRate[]>(`${this.baseUrl}/latex-rates-last10`);
  }
}
