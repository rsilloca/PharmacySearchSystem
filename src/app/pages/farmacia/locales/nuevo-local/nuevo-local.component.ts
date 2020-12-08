import { GoogleMapsAPIWrapper, MapsAPILoader, MouseEvent } from '@agm/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
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

  idFarmacia: number = 0;
  isEditar: boolean=false;
  //FormsControl
  disableSelect = new FormControl(false);
  coordenadasF: FormControl = new FormControl('');

  constructor(private formBuilder: FormBuilder,
              private farmaciaService: FarmaciaService,
              private mapsApi: MapsAPILoader,
              private usuarioService: UsuarioService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void { 
    this.getCurrentLocation();//depende a checkbox
    this.formGroupData = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
    });
    this.idFarmacia = this.activatedRoute.snapshot.params.id || 0;
    this.isEditar = this.idFarmacia!=0;
    if(this.isEditar){
      console.log("Modo Edicion");
      this.obtenerDatos();
    }
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

    for(let i=0; i<3; i++){
      let haux=new Horario();
      haux.diaSemana=i;
      haux.horaApertura="9:00";
      haux.horaCierre="18:00";
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
    console.log('farmacia enviado', farmacia);
    console.log('usuario enviado', usuario);
    this.farmaciaService.createFarmacia([farmacia]).subscribe(response => {
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
  
  obtenerDatos(): void{
    this.farmaciaService.getFarmacia(this.idFarmacia).subscribe(response => {
      console.log("Farmacia Encontrada", response);
    });
  }

}
