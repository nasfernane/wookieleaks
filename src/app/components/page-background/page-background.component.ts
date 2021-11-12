import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-page-background',
  templateUrl: './page-background.component.html',
  styleUrls: ['./page-background.component.scss']
})
export class PageBackgroundComponent implements OnInit, AfterViewInit {
  @Input() image: string;
  @ViewChild('container') container: ElementRef;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.container.nativeElement.setAttribute("style", `background-image: url('../../../assets/images/${this.image}')`);
  }
}
