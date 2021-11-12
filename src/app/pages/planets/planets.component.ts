import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['name', 'climate', 'diameter'];

  constructor(
    public globalService: GlobalService,
  ) { }

  async ngOnInit() {
    this.globalService.breadcrumb = 'planets';
    await this.globalService.setDataSource('planets')
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  get dataSource() {
    return this.globalService.dataSources['planets'];
  }

}
