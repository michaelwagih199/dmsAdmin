
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocPlacesService {

  private baseUrl = `${environment.baseUrl}/docsPlaces`;
  constructor(private http: HttpClient) {}

      
  findAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  findByDepartmentId(departmentId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${departmentId}`);
  }

  create(object: any,departmentId: any): Observable<any> {
    return this.http.post(`${this.baseUrl}?departmentId=${departmentId}`, object);
  }

  update(object: any,id: any, departmentId: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}?departmentId=${departmentId}`, object);
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
