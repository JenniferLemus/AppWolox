import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LandingDetailComponent } from './landing-detail.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from './components/footer/footer.component';
import { SocialNetworksComponent } from './components/social-networks/social-networks.component';
import { BenefitsComponent } from './components/benefits/benefits.component';



@NgModule({
  declarations: [
    HeaderComponent,
    LandingDetailComponent,
    FooterComponent,
    SocialNetworksComponent,
    BenefitsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FlexLayoutModule,
    TranslateModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HeaderComponent,
    LandingDetailComponent,
  ],
})
export class LandingDetailModule { }
