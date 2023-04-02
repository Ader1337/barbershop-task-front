import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { BarberService } from './../../services/barber.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss', '../../app.component.scss']
})
export class MainComponent implements OnInit {
  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {
   
  }

  

}
