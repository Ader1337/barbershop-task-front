import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


interface ILoginForm {
  email: string,
  pass: string,
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss', '../../app.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm: ILoginForm  =  {
    email: '',
    pass: ''
  }

  error: string = ''

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogin() {

    if (!this.loginForm.pass || !this.loginForm.email ) {
      this.error = 'Всі поля повинні бути заповненими.'
      return
    }

    this.router.navigate(['main'])

  }

}
