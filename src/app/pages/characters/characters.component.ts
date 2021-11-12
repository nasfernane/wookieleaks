import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['name', 'birth_year', 'gender'];
  formControl: FormGroup;
  genderSelected: string;

  constructor(
    public globalService: GlobalService,
    public formBuilder: FormBuilder
  ) {

    this.formControl = formBuilder.group({
      name: '',
      birth_year: '',
      gender: '',
    })

    this.formControl.valueChanges.subscribe(value => {
      const filter = { ...value, name: value.name.trim().toLowerCase() } as string;
      this.dataSource.filter = filter;
    });
  }

  async ngOnInit() {
    this.globalService.breadcrumb = 'Characters';
    await this.globalService.setDataSource('people')
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // surcharge les prédictions sur le filtre de la datasource 
    this.dataSource.filterPredicate = ((data, filter) => {
      const a = !filter.name || data.name.toLowerCase().includes(filter.name);
      const b = !filter.birth_year || data.birth_year.toLowerCase().includes(filter.birth_year);
      const c = !filter.gender || data.gender === filter.gender;
      return a && b && c;
    });
  }

  get dataSource() {
    return this.globalService.dataSources['people'];
  }
}
