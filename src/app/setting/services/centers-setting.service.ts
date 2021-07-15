import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CentersSettingService {
  
  private baseUrl = `${environment.baseUrl}/settings/centers`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getNames(): Observable<any> {
    return this.http.get(`${this.baseUrl}/names`);
  }

  findByName(name: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/name?centerName=${name}`);
  }

  create(object: any, centerId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}?hospitalId=${centerId}`, object);
  }

  update(id: number, object: Object): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, object);
  }

  delete(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/archive?id=${id}`, null);
  }
  
  loginToCenters(userName:any, password:any):Observable<any>{
    return this.http.get(`${this.baseUrl}/login?username=${userName}&password=${password}`)
  }
  
}
