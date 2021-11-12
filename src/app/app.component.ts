import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from "@angular/platform-browser";
import { GlobalService } from './services/global/global.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'wookie-leaks';

  constructor(
    private globalService: GlobalService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,

  ) {
    this.matIconRegistry.addSvgIcon(
      "bb8",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/bb8.svg")
    )
    this.matIconRegistry.addSvgIcon(
      "blaster",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/blaster.svg")
    )
    this.matIconRegistry.addSvgIcon(
      "boba_fett",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/boba_fett.svg")
    )
    this.matIconRegistry.addSvgIcon(
      "c3po",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/c3po.svg")
    )
    this.matIconRegistry.addSvgIcon(
      "darth_vader",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/darth_vader.svg")
    )
    this.matIconRegistry.addSvgIcon(
      "death_star",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/death_star.svg")
    )
    this.matIconRegistry.addSvgIcon(
      "finn",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/finn.svg")
    )
    this.matIconRegistry.addSvgIcon(
      "geonosis",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/geonosis.svg")
    )
    this.matIconRegistry.addSvgIcon(
      "master_yoda",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/master_yoda.svg")
    )
    this.matIconRegistry.addSvgIcon(
      "speeder",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/speeder.svg")
    )
    this.matIconRegistry.addSvgIcon(
      "millenium_falcon",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/millenium_falcon.svg")
    )
  }

  ngOnInit() {
    this.globalService.userLogged = !!this.globalService.readFromLocalStorage('xsrfToken')
    this.globalService.userName = this.globalService.readFromLocalStorage('userName')
  }
}
