import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.scss']
})
export class StarshipsComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['name', 'MGLT', 'hyperdrive_rating'];

  constructor(
    public globalService: GlobalService,
  ) { }

  async ngOnInit() {
    this.globalService.breadcrumb = 'Starships';
    await this.globalService.setDataSource('starships')
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  get dataSource() {
    return this.globalService.dataSources['starships'];
  }
}
