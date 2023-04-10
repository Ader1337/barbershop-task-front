import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

interface IRegisterForm {
  email: string,
  pass: string,
  repeatPass: string
}

interface IregisterBody {
  email: string,
  password: string,
}


@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss', '../../app.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  registerForm: IRegisterForm = {
    email: '',
    pass: '',
    repeatPass: ''
  }
  error: string = ''
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('');
    }
  }

  isEmailCorrect() {
    if (/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(this.registerForm.email)) {
      return true
    } else {
      return false
    }
  }

  onSubmitRegister() {
    this.error = ''

    if (!this.registerForm.pass || !this.registerForm.email || !this.registerForm.repeatPass){
      this.error = 'Всі поля повинні бути заповненими.'
      return
    }

    if (!this.isEmailCorrect()){
      this.error = 'Пошта введена невірно.'
      return
    }

    if (this.registerForm.pass !==  this.registerForm.repeatPass){
      this.error = 'Паролі не співпадають.'
      return
    }

    let body: IregisterBody = {
      email: this.registerForm.email,
      password: this.registerForm.pass
    }

    this.authService.register(body).subscribe({
      next: (response) => {
        localStorage.setItem('token',response.token)
        this.router.navigate([''])

      },error: (err) => {
        if (err.error.message === 'Such user already exists')
          this.error = "Такий email вже зареєстровано"

        console.error(err)
      }
    })

  }

}
