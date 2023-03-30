import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GenerateHeadersService } from './generate-headers.service';
import { Router } from '@angular/router';


const API_URL = `${environment.serverUrl}/barbers`;
@Injectable({
  providedIn: 'root'
})
export class BarberService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  public getBarbers(): Observable<any> {
    return this.httpClient.get(`${API_URL}`)
  }
}
