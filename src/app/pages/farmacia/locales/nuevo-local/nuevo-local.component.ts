import { GoogleMapsAPIWrapper, MapsAPILoader, MouseEvent } from '@agm/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Farmacia } from 'src/app/@models/farmacia';
import { Horario } from 'src/app/@models/horario';
import { Moneda } from 'src/app/@models/moneda';
import { Producto } from 'src/app/@models/producto';
import { Usuario } from 'src/app/@models/usuario';
import { FarmaciaService } from 'src/app/@services/farmacia.service';
import { UsuarioService } from 'src/app/@services/usuario.service';

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
  //Objetos
  formGroupData: FormGroup;

  //Var globales
  lat = 0.0;
  lng = 0.0;
  zoom = 9;
  //FormsControl
  disableSelect = new FormControl(false);
  coordenadasF: FormControl = new FormControl('');
  formHoraApertura: FormArray = new FormArray([]);
  formHoraCierre: FormArray = new FormArray([]);
  horarios: Horario[]=[];

  constructor(private formBuilder: FormBuilder,
              private farmaciaService: FarmaciaService,
              private mapsApi: MapsAPILoader,
              private usuarioService: UsuarioService) { }

  ngOnInit(): void { 
    this.getCurrentLocation();//depende a checkbox
    this.formGroupData = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
    });
    for(let i=0; i<7; i++){
      this.formHoraApertura.push(new FormControl());
      this.formHoraCierre.push(new FormControl());
      let auxHora = new Horario();
      auxHora.idHorario=i;
      this.horarios.push(auxHora);
    }
    
  }

  displayedColumns: string[] = ['position', 'name', 'open', 'closed', 'select'];
  dataSource = new MatTableDataSource<Horario>(this.horarios);
  selection = new SelectionModel<Horario>(true, []);

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

  /** The label for the checkbox on the passed row 
  checkboxLabel(row?: Horario): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  */
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 8;
        this.verCoordenadas();
      });
    }
    else {
      console.log("Geolocation is not supported by this browser.")
    }
  }

  markerDragEnd(evt: MouseEvent) {
    this.lat = evt.coords.lat;
    this.lng = evt.coords.lng;
    this.verCoordenadas();
    //console.log("lat" + this.lat);
    //console.log("lng" + this.lng);
  }

  verCoordenadas(){
    this.coordenadasF.setValue(this.lat + ', ' + this.lng);
  }
  deshabilitarCaja(){
    if(this.disableSelect.value){
      this.coordenadasF.enable();
    }else{
      this.coordenadasF.disable();
    }
  }
  registrarFarmacia(){
    let farmacia:Farmacia = new Farmacia();
    let moneda: Moneda = new Moneda();
    moneda.idMoneda = 1;
    let horario:Horario[] = [];
   // let producto:Producto = new Producto() ;
    let usuario:Usuario = this.usuarioService.currentUserSBF();

    for(let i=0; i<this.formHoraApertura.value.length; i++){
      let haux=new Horario();
      haux.diaSemana=i;
      if(this.formHoraApertura.value[i]==null){
        haux.horaApertura="00:00";
      }else{
        haux.horaApertura= this.formHoraApertura.value[i];
      }
      if(this.formHoraCierre.value[i]==null){
        haux.horaCierre="23:59";
      }else{
        haux.horaCierre= this.formHoraCierre.value[i];
      }
      haux.logEstado=this.selection.isSelected(this.horarios[i])?1:0;
      horario.push(haux);
    }

    farmacia.nombre = this.formGroupData.controls['name'].value;
    farmacia.direccion = this.formGroupData.controls['address'].value;
    farmacia.latitud = this.lat;
    farmacia.longitud = this.lng;
    farmacia.usuarioFarmacia = [usuario];
    farmacia.horarios = horario;
    farmacia.monedas = moneda;
    farmacia.idMoneda = moneda.idMoneda;
    console.log('farmacia enviada',farmacia);
    for(let i=0; i<this.formHoraApertura.value.length; i++){
      console.log('dia',i+1, 'hora', this.formHoraApertura.value[i]);
    }
    for(let i=0; i<this.formHoraCierre.value.length; i++){
      console.log('dia',i+1, 'hora', this.formHoraCierre.value[i]);
    }
    this.farmaciaService.createFarmacia(farmacia).subscribe(response => {
    console.log('response crear farmacia', response);
    });
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
