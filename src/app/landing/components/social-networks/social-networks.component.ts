import { Component, OnInit } from '@angular/core';
import { DefaultConfig } from 'src/app/utilities/defaultconfig';

@Component({
  selector: 'app-social-networks',
  templateUrl: './social-networks.component.html',
  styleUrls: ['./social-networks.component.css']
})
export class SocialNetworksComponent implements OnInit {
  urlTwitter: string;
  constructor() {
    this.urlTwitter = DefaultConfig.DEFAULT_CONFIG_APP.DefaultUrlTwitter;
  }

  ngOnInit(): void {}

  /**
   * Navega al Twitter de wolox.
   *
   * @memberof WoloxersComponent
   */
  navigatePageTwitter(): void {
    window.location.href = this.urlTwitter;
  }

}
