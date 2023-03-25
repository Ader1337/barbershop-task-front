import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss', '../../app.component.scss']
})
export class MainComponent implements OnInit {
  userInfo: any
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe({
      next: (user) => {
        console.log(user)
        this.userInfo = user
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  signOut() {
    localStorage.removeItem('token')
    this.router.navigate(['login'])
  }

}
