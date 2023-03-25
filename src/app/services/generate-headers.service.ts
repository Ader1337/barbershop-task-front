import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class GenerateHeadersService {

  constructor(
    private readonly router: Router
  ) { }

  public getHeaders(): any {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['login'])
      return
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      "X-Requested-With": "XMLHttpRequest",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      'Authorization': `${localStorage.getItem('token') }`
    })
  }
}
