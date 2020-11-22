import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';

//Select del Acceso directo
interface Farmacia {
  value: string;
  viewValue: string;
}
//Tabla de horarios
export interface TimeTable {
  position: number; 
  day: string;
  openning: string;
  closing: string;
}
const ELEMENT_DATA: TimeTable[] = [
  {position: 1, day: 'Lunes', openning: '9:00', closing: '18:00'},
  {position: 2, day: 'Martes', openning: '9:00', closing: '18:00'},
  {position: 3, day: 'Miercoles', openning: '9:00', closing: '18:00'},
  {position: 4, day: 'Jueves', openning: '9:00', closing: '18:00'},
  {position: 5, day: 'Viernes', openning: '9:00', closing: '18:00'},
  {position: 6, day: 'Sábado', openning: '9:00', closing: '18:00'},
  {position: 7, day: 'Domingo', openning: '9:00', closing: '18:00'},
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']

})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  farmacias: Farmacia[] = [
    {value: 'far-0', viewValue: 'Farmacia - Paucarpata'},
    {value: 'far-1', viewValue: 'Farmacia - Cayma'},
    {value: 'far-2', viewValue: 'Farmacia - Yanahuara'},
    {value: 'far-3', viewValue: 'Inkafarma - Ejército'}
  ];

  //CLASE TABLA
  displayedColumns: string[] = ['position', 'day', 'openning', 'closing', 'select'];
  dataSource = new MatTableDataSource<TimeTable>(ELEMENT_DATA);
  selection = new SelectionModel<TimeTable>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: TimeTable): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
