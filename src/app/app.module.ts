import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LandingDetailModule } from './landing/landing-detail.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { RegisterComponent } from './register/register.component';
import { PersistenceModule } from 'angular-persistence';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TechnologiesComponent } from './technologies/technologies.component';
import { PipePipe } from './pipes/pipe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    TechnologiesComponent,
    PipePipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    LandingDetailModule,
    FlexLayoutModule,
    NgSelectModule,
    HttpClientModule,
    PersistenceModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    FormsModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}