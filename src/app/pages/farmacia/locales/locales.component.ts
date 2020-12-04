import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

//Tabla de horarios
export interface LocalTable {
  position: number;
  name: string;
  address: string;
  openning: string;
  closing: string;

}

const ELEMENT_DATA: LocalTable[] = [
  { position: 1, name: 'Inkafarma', address: 'Sachaca', openning: '9:00', closing: '18:00' },
  { position: 2, name: 'Mifarma', address: 'Sachaca', openning: '9:00', closing: '18:00' },
  { position: 3, name: 'Angel', address: 'Sachaca', openning: '9:00', closing: '18:00' },
  { position: 4, name: 'Botica Perú', address: 'Sachaca', openning: '9:00', closing: '18:00' },
  { position: 5, name: 'ByS', address: 'Sachaca', openning: '9:00', closing: '18:00' },
  { position: 6, name: 'Arcangel', address: 'Sachaca', openning: '9:00', closing: '18:00' },
];

@Component({
  selector: 'fury-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.scss']
})
export class LocalesComponent implements OnInit {

  //CLASE TABLA
  displayedColumns: string[] = ['position', 'name', 'address', 'openning', 'closing', 'action'];
  dataSource = new MatTableDataSource<LocalTable>(ELEMENT_DATA);

  constructor() { }

  ngOnInit(): void {
  }

}
