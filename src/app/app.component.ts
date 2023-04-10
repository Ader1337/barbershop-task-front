import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Barbershop';

  constructor(
    private readonly router: Router
  ) {

  }

  ngOnInit() {
    console.log(localStorage.getItem('token'))
    if (!localStorage.getItem('token'))
      this.router.navigate(['login'])
  /*   else
      this.router.navigate(['form']) */
  }
}
