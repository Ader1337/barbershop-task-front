import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GenerateHeadersService } from './generate-headers.service';
import { Router } from '@angular/router';


const API_URL = `${environment.serverUrl}/auth`;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly generateHeadersService: GenerateHeadersService,
  ) { }
  
  public register(body: any): Observable<any> {
    return this.httpClient.post(`${API_URL}/register`, body)
  }

  public login(body: any): Observable<any> {
    return this.httpClient.post(`${API_URL}/sign_in`, body)
  }


  public getUser(): Observable<any> {
    console.log('getuser')
    return this.httpClient.post(`${API_URL}/tasks`, {}, { headers: this.generateHeadersService.getHeaders() })
  }
}
