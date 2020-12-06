import { GoogleMapsAPIWrapper, MapsAPILoader, MouseEvent } from '@agm/core';
import { google } from '@agm/core/services/google-maps-types';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

export interface TimeTable {
  name: string;
  open: string;
  closed: string;
  position: number;
}

const ELEMENT_DATA: TimeTable[] = [
  { position: 1, name: 'Lun', open: '09:00', closed: '18:00' },
  { position: 2, name: 'Mar', open: '09:00', closed: '18:00' },
  { position: 3, name: 'Mie', open: '09:00', closed: '18:00' },
  { position: 4, name: 'Jue', open: '09:00', closed: '18:00' },
  { position: 5, name: 'Vie', open: '09:00', closed: '18:00' },
  { position: 6, name: 'Sab', open: '09:00', closed: '18:00' },
  { position: 7, name: 'Dom', open: '09:00', closed: '18:00' },
];

@Component({
  selector: 'fury-nuevo-local',
  templateUrl: './nuevo-local.component.html',
  styleUrls: ['./nuevo-local.component.scss']
})
export class NuevoLocalComponent implements OnInit {

  disableSelect = new FormControl(false);

  lat = 19.290950;
  lng = -99.653015;
  zoom = 9;
  

  constructor(private formBuilder: FormBuilder, private mapsApi: MapsAPILoader) { }


  ngOnInit(): void { 
    this.getCurrentLocation();
  }

  displayedColumns: string[] = ['position', 'name', 'open', 'closed', 'select'];
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

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 8;
       // console.log("cordenadas actuales ", this.lat, this.lng);
      });
    }
    else {
      console.log("Geolocation is not supported by this browser.")
    }
  }

  markerDragEnd(evt: MouseEvent) {
    this.lat = evt.coords.lat;
    this.lng = evt.coords.lng;
    console.log("lat" + this.lat);
    console.log("lng" + this.lng);
  }
  
  // openDialog(): void {
  //   const dialog = this.dialog.open(AlertComponent, {
  //     width: '20rem',
  //     data: { titulo: '¡ACCIÓN EXITOSA!', mensaje: '¡Registro realizado correctamente!' }
  //   });
  //   dialog.afterClosed().subscribe(respuesta => {
  //     console.log(respuesta);
  //   });
  // }

}
