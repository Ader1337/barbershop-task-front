import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GenerateHeadersService } from './generate-headers.service';
import { Router } from '@angular/router';


const API_URL = `${environment.serverUrl}/record`;

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly generateHeadersService: GenerateHeadersService,
  ) { }


  public addRecord(body: any): Observable<any> {
    return this.httpClient.post(`${API_URL}`, body, { headers: this.generateHeadersService.getHeaders() })
  }

  public getUserRecord(query: any): Observable<any> {
    return this.httpClient.get(`${API_URL}`, {params: query, headers: this.generateHeadersService.getHeaders() })
  }

  public getAvailableTime(query: any): Observable<any> {
    return this.httpClient.get(`${API_URL}/available`, { params: query, headers: this.generateHeadersService.getHeaders() })
  }

  public deleteRecord(query: any): Observable<any> {
    return this.httpClient.delete(`${API_URL}`, { params: query, headers: this.generateHeadersService.getHeaders() })
  }
}
