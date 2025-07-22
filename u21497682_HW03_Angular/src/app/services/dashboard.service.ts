import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:5240/api/Store'; // Update with your API URL

  constructor(private http: HttpClient) { }

  getProductCountByBrand(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getProductCountByBrand`);
  }

  getProductCountByType(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getProductCountByType`);
  }

  getTopExpensiveProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getTopExpensiveProducts`);
  }
}