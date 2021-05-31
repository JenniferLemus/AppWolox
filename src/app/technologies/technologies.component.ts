import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PrincipalServiceService } from '../core/services/principal-service.service';
import { TechnologiesObject } from '../entities/technologiesObject';
import { PersistenceInfoService } from '../utilities/persistence/persistence-info.service';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css']
})
export class TechnologiesComponent implements OnInit {
  filterTech: string;
  TechnologiesList: Array<TechnologiesObject>;
  constructor(private spinner: NgxSpinnerService,
    private readonly principalService: PrincipalServiceService,
    private readonly persistence: PersistenceInfoService,
    private router: Router) { }

  ngOnInit(): void {
    this.getTechnologies();
  }

  getTechnologies(): void {
    debugger;
    this.spinner.show();
    this.principalService
      .getTechnologies()
      .subscribe((result: any) => {
        this.TechnologiesList = result;
        if (this.TechnologiesList) {
          setTimeout(() => {
            this.spinner.hide();
          }, 5000);
        }
      });
  }

  getFavourite(): string[] {
    let favourites = this.persistence.getInfo('technologies');
    if (
      favourites === null ||
      favourites === '' ||
      favourites === undefined
    ) {
      favourites = '[]';
    }
    const favouritesArry = JSON.parse(
      favourites
    ) as Array<string>;
    return favouritesArry;
  }

  favourite(item: any): any {
    item.puntos = 1;
    const favouritesArry = this.getFavourite();
    if (favouritesArry.indexOf(item.tech) < 0) {
      favouritesArry.push(item);
      this.persistence.setInfo(
        'technologies',
        JSON.stringify(favouritesArry)
      );
    }
  }

  Asc(): void {
    this.TechnologiesList.sort((itemOne, itemTwo) =>
      itemOne.tech.localeCompare(itemTwo.tech)
    );
  }

  
  Des(): void {
    this.TechnologiesList.sort((temOne, itemTwo) =>
      itemTwo.tech.localeCompare(temOne.tech)
    );
  }

  navegate(): void {
    this.router.navigate(['/landing']);
  }


}
