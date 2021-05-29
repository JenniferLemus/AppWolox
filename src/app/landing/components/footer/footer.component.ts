import { Component, OnInit } from '@angular/core';
import { DefaultConfig } from 'src/app/utilities/defaultconfig';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  urlWolox: string;
  idFooter: string;
  constructor() {
    this.urlWolox = DefaultConfig.DEFAULT_CONFIG_APP.DefaultUrlWolox;
  }

  ngOnInit(): void { }

  /**
   * Navega a la pagina de wolox.
   *
   * @memberof FooterlandingComponent
   */
  navigatePageWolox(): void {
    window.location.href = this.urlWolox;
  }

}
