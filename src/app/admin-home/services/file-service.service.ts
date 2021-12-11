import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileServiceService {
  
  private baseUrl = `${environment.baseUrl}/files`;

  constructor(private http: HttpClient) {}

  getImageByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/download/${name}`, {
      responseType: 'blob',
    });
  }

  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, { responseType: 'blob' });
  }

  getfile(fileName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/download/${fileName}`, { responseType: 'blob' });
  }
}
