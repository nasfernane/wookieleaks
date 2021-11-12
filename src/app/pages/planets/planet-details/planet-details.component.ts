import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

interface Planet {
  // ... insérer props de character
}

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.scss']
})
export class PlanetDetailsComponent implements OnInit {
  planet: any;
  id: string;

  constructor(
    private globalService: GlobalService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    this.planet = await this.globalService.fetchSwapi('planets', this.id)
    this.globalService.breadcrumb = `planets » ${this.globalService.capitalize(this.planet.name)}`
  }

}
