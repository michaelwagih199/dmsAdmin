import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FolderService {

  private baseUrl = `${environment.baseUrl}/documents/parentFolders`;

  constructor(private http: HttpClient) {}

  findTreeAll(departmentId:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getTree/${departmentId}`);
  }

  delete(id: string,parentId:any) {
    return this.http.delete(`${this.baseUrl}/${id}?parentId=${parentId}`);
  }

  create(folderName:string,parentId:string): Observable<any> {
    return this.http.post(`${this.baseUrl}?folderName=${folderName}&parentId=${parentId}`, null);
  }
  
  update(id: number, object: Object): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, object);
  }

}
