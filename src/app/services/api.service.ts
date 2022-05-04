import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = "http://apps.thinkoverit.com/api/";

  constructor(private http: HttpClient) { }

  getotp(path: string, data: any) {
    return this.http.post(this.url + path, data);
  }

  verifyotp(path: string, data: string) {
    return this.http.post(this.url + path, data);
  }
}
