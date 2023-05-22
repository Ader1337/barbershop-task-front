import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMenuOpen: boolean = false
  constructor(
    private readonly router: Router
  ) { }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
  }

  ngOnInit(): void {
  }

  signOut() {
    localStorage.removeItem('token')
    this.router.navigate(['login'])
  }

}
