import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingDetailComponent } from './landing/landing-detail.component';

const routes: Routes = [
  {
    path: 'landing',
    component: LandingDetailComponent,
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
