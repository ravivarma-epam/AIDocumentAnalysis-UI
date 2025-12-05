import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, tap } from 'rxjs'; // Import lastValueFrom

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config: any;

  constructor(private http: HttpClient) {}

  // Change return type to Promise
  loadConfig(): Promise<any> {
    const config$ = this.http.get('/appSettings.json').pipe(
      tap(data => {
        this.config = data;
        console.log('Config loaded successfully:', this.config);
      })
    );
    
    // Convert the Observable to a Promise so Angular can await it
    return lastValueFrom(config$);
  }

  getaidaUrl() {
    if (!this.config) {
      console.error('Config not loaded yet! Ensure APP_INITIALIZER is set up.');
      return '';
    }
    return this.config.aidaUrl;
  }
}