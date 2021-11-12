import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  private baseUrl = `${environment.baseUrl}/logs`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  findById(id: any) : Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  create(message: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${message}`, null);
  }

}
