import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {
  character: any;
  id: string;

  constructor(
    private globalService: GlobalService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    this.character = await this.globalService.fetchSwapi('people', this.id)
    this.globalService.breadcrumb = `Characters » ${this.globalService.capitalize(this.character.name)}`
  }

}
