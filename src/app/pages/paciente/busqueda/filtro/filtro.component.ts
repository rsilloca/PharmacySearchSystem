import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit {

  @Input('expandableMultiple') expandableMultiple: boolean = false;

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'm';
    }
    return value;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
