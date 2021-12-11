import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DocsService {


  private baseUrl = `${environment.baseUrl}/docs`;
  constructor(private http: HttpClient) { }

  findByParent(parentId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/parent/${parentId}`);
  }

  getImageByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/download/${name}`, {
      responseType: 'blob',
    });
  }


  filterByType(typeId: string, parentId: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/type?typeId=${typeId}&parentId=${parentId}`
    );
  }

  findByDocCode(docCode: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/code/${docCode}`);
  }

  findByDocDates(searchValue: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/date/${searchValue}`);
  }

  //http://localhost:8080/api/docs/titleWithOwner?docTitle=title&owner=kero
  findByTitleAndOwner(title: string, owner: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/titleWithOwner?docTitle=${title}&owner=${owner}`);
  }

  findBydepartment(value: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/department/${value}`);
  }

  findByDocOwner(searchValue: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/owner/${searchValue}`);
  }

  findByDocTitle(searchValue: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/title/${searchValue}`);
  }

  getCodes(parentId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/codes?parentId=${parentId}`);
  }

  getOwners(parentId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/owners?parentId=${parentId}`);
  }

  getDates(parentId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/dates?parentId=${parentId}`);
  }

  getTitles(parentId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/titles?parentId=${parentId}`);
  }

  moveDocComponent(parentId: any, id: string): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/moveFile/${id}?parentId=${parentId}`,
      null
    );
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
