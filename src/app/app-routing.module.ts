import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { MainComponent } from './pages/main/main.component';
import { AuthGuard } from './guards/auth.guard';
import { AboutComponent } from './components/about/about.component';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegistrationPageComponent },
  {
    path: '', component: MainComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'form', pathMatch: 'full' },
      { path: 'admin', component: AdminPageComponent, },
      { path: 'form', component: AppointmentFormComponent, },
      { path: 'about', component: AboutComponent },
    ]
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
