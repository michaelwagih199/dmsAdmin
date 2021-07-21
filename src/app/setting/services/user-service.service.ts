import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private baseUrl = `${environment.baseUrl}/users`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  create(object: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, object);
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
