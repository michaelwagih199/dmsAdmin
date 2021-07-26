import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
 
  private baseUrl = `${environment.baseUrl}/departments`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  findById(id: any) : Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  
  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  create(object: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, object);
  }
  
  update(id: number, object: Object): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, object);
  }


}
