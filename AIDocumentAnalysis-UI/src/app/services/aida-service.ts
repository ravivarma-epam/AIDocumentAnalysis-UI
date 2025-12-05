import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AidaService {
  constructor(private http: HttpClient){ 
  }

  login(url:string, body?:any)
  {
    return this.http.post(url,body)
  }

  getConfig(): Observable<any> {
    return this.http.get('/assets/appsettings.json');
  }
}
