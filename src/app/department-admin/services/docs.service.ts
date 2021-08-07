import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DocsService {

  private baseUrl = `${environment.baseUrl}/docs`;
  constructor(private http: HttpClient) {}


  findByParent(parentId:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/parent/${parentId}`);
  }

  getImageByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/download/${name}`,{ responseType: 'blob' });
  }
  
  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
