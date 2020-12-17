import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LATITUD_DEFAULT, LONGITUD_DEFAULT } from 'src/app/@constants/constantes';
import { Farmacia } from 'src/app/@models/farmacia';
import { FiltroLocales } from 'src/app/@models/filtro-locales';
import { FarmaciaService } from 'src/app/@services/farmacia.service';
import { UsuarioService } from 'src/app/@services/usuario.service';

//Select del Acceso directo
// interface Farmacia {
//   value: string;
//   viewValue: string;
// }
//Tabla de horarios
export interface TimeTable {
  position: number;
  day: string;
  openning: string;
  closing: string;
}
const ELEMENT_DATA: TimeTable[] = [
  { position: 1, day: 'Lun', openning: '9:00', closing: '18:00' },
  { position: 2, day: 'Mar', openning: '9:00', closing: '18:00' },
  { position: 3, day: 'Mie', openning: '9:00', closing: '18:00' },
  { position: 4, day: 'Jue', openning: '9:00', closing: '18:00' },
  { position: 5, day: 'Vie', openning: '9:00', closing: '18:00' },
  { position: 6, day: 'Sáb', openning: '9:00', closing: '18:00' },
  { position: 7, day: 'Dom', openning: '9:00', closing: '18:00' },
];

@Component({
  selector: 'fury-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isLoadingStock = false;
  isLoadingHorario = false;
  isLoadingMap = false;
  farmacias: Farmacia[] = [];
  lat = LATITUD_DEFAULT;
  lng = LONGITUD_DEFAULT;
  zoom = 12;

  constructor(private farmaciaService: FarmaciaService, private userService: UsuarioService) { }

  ngOnInit(): void {
    this.listarFarmacias();
  }

  // farmacias: Farmacia[] = [
  //   { value: 'far-0', viewValue: 'Farmacia - Paucarpata' },
  //   { value: 'far-1', viewValue: 'Farmacia - Cayma' },
  //   { value: 'far-2', viewValue: 'Farmacia - Yanahuara' },
  //   { value: 'far-3', viewValue: 'Inkafarma - Ejército' }
  // ];

  //CLASE TABLA
  displayedColumns: string[] = ['day', 'openning', 'closing', 'select'];
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

  reloadStock() {
    this.isLoadingStock = true;
    setTimeout(() => {
      this.isLoadingStock = false;
    }, 2000);
  }

  reloadHorario() {
    this.isLoadingHorario = true;
    setTimeout(() => {
      this.isLoadingHorario = false;
    }, 2000);
  }

  reloadMap() {
    this.isLoadingMap = true;
    setTimeout(() => {
      this.isLoadingMap = false;
    }, 2000);
  }

  listarFarmacias() {
    let filtro = new FiltroLocales();
    filtro.pagina = 0;
    filtro.regxpag = 1000;
    filtro.idUsuario = +this.userService.getIdUsuario();
    this.farmaciaService.getFarmaciaFiltros(filtro).subscribe(response => {
      this.farmacias = (response as any).data;
    });
  }

}
