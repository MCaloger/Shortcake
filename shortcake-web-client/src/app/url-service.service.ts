import { environment } from './../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  apiUrl = environment.serverUrl;
  constructor(private http: HttpClient) { }

  createUrl(url: string) {
    return this.http.post(`${this.apiUrl}/new`, { url });
  }

  getUrl(code: string) {
    return this.http.get(`${this.apiUrl}/u/${code}`);
  }
}
