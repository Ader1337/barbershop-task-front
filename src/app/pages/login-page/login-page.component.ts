import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';


interface ILoginForm {
  email: string,
  pass: string,
}

interface IloginBody {
  email: string,
  password: string,
}


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss', '../../app.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm: ILoginForm = {
    email: '',
    pass: ''
  }

  error: string = ''

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('');
    }
  }

  onLogin() {

    if (!this.loginForm.pass || !this.loginForm.email) {
      this.error = 'Всі поля повинні бути заповненими.'
      return
    }

    let body: IloginBody = {
      email: this.loginForm.email,
      password: this.loginForm.pass,
    }
    this.authService.login(body).subscribe({
      next: (response) => {
        console.log(response)
        localStorage.setItem('token', response.token)
        this.router.navigate([''])
      },
      error: (err) => {
        console.log(err.error.message)
        if (err.error.message === 'Authentication failed. Invalid user or password.')
          this.error = 'Пароль або пошта введені невірно'
        console.error(err)
      }
    })
  }

}
