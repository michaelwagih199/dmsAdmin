import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SubFolderService {

  private baseUrl = `${environment.baseUrl}/documents/supFolders`;

  constructor(private http: HttpClient) {}

  findByParentId(parentId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/parent/${parentId}`);
  }

  findByDepartmentId(departmentId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/department/${departmentId}`);
  }

  create(object: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, object);
  }

  delete(id: string) : Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}