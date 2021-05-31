import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingDetailComponent } from './landing/landing-detail.component';
import { RegisterComponent } from './register/register.component';
import { TechnologiesComponent } from './technologies/technologies.component';

const routes: Routes = [
  {
    path: 'landing',
    component: LandingDetailComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'technologies',
    component: TechnologiesComponent,
  },
  {
    path: '',
    component: LandingDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
