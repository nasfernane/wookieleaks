import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-starship-details',
  templateUrl: './starship-details.component.html',
  styleUrls: ['./starship-details.component.scss']
})
export class StarshipDetailsComponent implements OnInit {
  starship: any;
  id: string;

  constructor(
    private globalService: GlobalService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    this.starship = await this.globalService.fetchSwapi('starships', this.id)
    this.globalService.breadcrumb = `Starships » ${this.globalService.capitalize(this.starship.name)}`
  }

}
