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

  getConfig(): Observable<any> {
    return this.http.get('/assets/appsettings.json');
  }
}
