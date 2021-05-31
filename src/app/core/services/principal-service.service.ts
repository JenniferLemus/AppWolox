import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as countries from 'src/countries.json';
import { of } from 'rxjs';
import { PrincipalObject } from 'src/app/entities/principalObject';

@Injectable({
  providedIn: 'root'
})
export class PrincipalServiceService {
  domainUrl: string;
  constructor(private readonly http: HttpClient) {    
    this.domainUrl = environment.apiRegisterUrl;
  }

  getCountries() {
    return of((countries as any).default);
  }

  saveInformation(object: PrincipalObject){
    return this.http.post(`${this.domainUrl}signup`, object);
  }

  getTechnologies() {
    return this.http.get(`${this.domainUrl}techs`);
  }

}
