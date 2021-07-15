import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExportPatientService {
  private baseUrl = `${environment.baseUrl}/googleSheet`;
  
  constructor(private http: HttpClient) {}

  findAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/exportPatients`);
  }

  exportCycles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/exportCycles`);
  }

}
