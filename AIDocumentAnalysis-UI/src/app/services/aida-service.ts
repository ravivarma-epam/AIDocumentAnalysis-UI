import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AidaService {
  constructor(private http: HttpClient){ 
  }

  login(url: string, body?: { id_token: string }): Observable<{ accessToken?: string; message: string }>
  {
    return this.http.post<{ accessToken?: string; message: string }>(url, body);
  }

  analyzeDocument(url: string, file: File): Observable<{ filePath: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ filePath: string }>(url, formData);
  }

  getConfig(): Observable<any> {
    return this.http.get('/assets/appsettings.json');
  }
}
