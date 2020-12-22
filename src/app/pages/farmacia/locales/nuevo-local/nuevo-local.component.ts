import { GoogleMapsAPIWrapper, MapsAPILoader, MouseEvent } from '@agm/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { LATITUD_DEFAULT, LONGITUD_DEFAULT } from 'src/app/@constants/constantes';
import { Farmacia } from 'src/app/@models/farmacia';
import { Horario } from 'src/app/@models/horario';
import { Moneda } from 'src/app/@models/moneda';
import { Producto } from 'src/app/@models/producto';
import { Usuario } from 'src/app/@models/usuario';
import { FarmaciaService } from 'src/app/@services/farmacia.service';
import { UsuarioService } from 'src/app/@services/usuario.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { SpinnerService } from 'src/app/shared/spinner.service';

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
  form: FormGroup;
  //Var globales
  lat = LATITUD_DEFAULT;
  lng = LONGITUD_DEFAULT;
  zoom = 17;

  idFarmacia: number = 0;
  isEditar: boolean = false;
  //FormsControl
  disableSelect = new FormControl(false);
  coordenadasF: FormControl = new FormControl('');
  formHoraApertura: FormArray = new FormArray([]);
  formHoraCierre: FormArray = new FormArray([]);
  horarios: Horario[] = [];
  dias: string[] = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];

  //Para editar
  farmToEdit: Farmacia;

  constructor(private formBuilder: FormBuilder,
    private farmaciaService: FarmaciaService,
    private mapsApi: MapsAPILoader,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private spinnerService: SpinnerService,
    private alertService: AlertService,
    private router: Router) { }

  ngOnInit(): void {
    this.getCurrentLocation();//depende a checkbox
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      automaticLocation: [false],
      location: ['', Validators.required]
    });
    this.form.controls['automaticLocation'].valueChanges.subscribe(change => {
      if (change) {
        this.getCurrentLocation();
      }
    });
    for (let i = 0; i < 7; i++) {
      this.formHoraApertura.push(new FormControl('00:00'));
      this.formHoraCierre.push(new FormControl('00:00'));
      let auxHora = new Horario();
      auxHora.diaSemana = i;
      this.horarios.push(auxHora);
    }

    this.idFarmacia = this.activatedRoute.snapshot.params.id || 0;
    this.isEditar = this.idFarmacia != 0;
    if (this.isEditar) {
      this.getDataBDtoTemplate();
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
        this.zoom = 17;
        this.verCoordenadas();
      });
    } else {
      this.alertService.error('Error', 'La geolocalización no es soportada en este navegador');
    }
  }

  markerDragEnd(evt: MouseEvent) {
    this.lat = evt.coords.lat;
    this.lng = evt.coords.lng;
    this.verCoordenadas();
  }

  verCoordenadas() {
    this.form.controls['location'].setValue(this.lat + ', ' + this.lng);
  }
  deshabilitarCaja() {
    if (this.disableSelect.value) {
      this.coordenadasF.enable();
    } else {
      this.coordenadasF.disable();
    }
  }
  getDataFromTemplate(): Farmacia{
    if (this.form.invalid) return;
    console.log("Farm a editar", this.farmToEdit);
    let farmacia: Farmacia;
    if (this.isEditar == true){
      farmacia = this.farmToEdit;
      for (let i = 0; i < this.formHoraApertura.value.length; i++) {
        farmacia.horarios[i].horaApertura = this.makeFechaHoraMinuto(this.horarios[i].horaApertura,this.formHoraApertura.value[i]);
        farmacia.horarios[i].horaCierre = this.makeFechaHoraMinuto(this.horarios[i].horaCierre,this.formHoraCierre.value[i]);
        farmacia.horarios[i].logEstado =1;
      }
      farmacia.logEstado = 1;
      console.log("farmacias hora guardada",farmacia.horarios)
      farmacia.nombre = this.form.value['nombre'];
      farmacia.direccion = this.form.value['direccion'];
    }else{
      farmacia = new Farmacia(this.form.value);
      let moneda: Moneda = new Moneda();
      moneda.idMoneda = 1;     
      let usuario: Usuario = this.usuarioService.currentUserSBF();
      farmacia.usuarioFarmacia = [usuario];
      farmacia.monedas = moneda;
      farmacia.idMoneda = moneda.idMoneda;
      let horario: Horario[] = [];
      for (let i = 0; i < this.formHoraApertura.value.length; i++) {
        let haux = new Horario();
        haux.diaSemana = i;
        haux.horaApertura = this.formHoraApertura.value[i];
        haux.horaCierre = this.formHoraCierre.value[i];
        haux.logEstado = this.selection.isSelected(this.horarios[i]) ? 1 : 0;
        horario.push(haux);
      }
      farmacia.horarios = horario;
    }
   
    farmacia.latitud = this.lat;
    farmacia.longitud = this.lng;
    
    return farmacia;
  }
  registrarFarmacia() {
    let spinner = this.spinnerService.start('Registrando local...');
    this.farmaciaService.createFarmacia(this.getDataFromTemplate()).subscribe(response => { //Obtengo objeto Farmacia con el método getDataFromTemplate
      // console.log('response crear farmacia', response);
      this.spinnerService.stop(spinner);
      this.alertService.success('¡Éxito!', 'Local registrado correctamente.');
      this.router.navigate(['/pharmacy/locales']);
    }, error => {
      this.spinnerService.stop(spinner);
      this.alertService.error();
    });
  }
  //-------------EDITAR FARMACIA--------------
  getDataBDtoTemplate(): void {
    this.farmaciaService.getFarmacia(this.idFarmacia).subscribe(response => {
      this.farmToEdit = (response as Farmacia);
      this.form.controls['nombre'].setValue(this.farmToEdit.nombre);
      this.form.controls['direccion'].setValue(this.farmToEdit.direccion);
      this.form.controls['location'].setValue(this.farmToEdit.latitud + ', ' + this.farmToEdit.longitud);
      this.lat = this.farmToEdit.latitud;
      this.lng = this.farmToEdit.longitud;
      this.horarios = this.farmToEdit.horarios;
      
      for (let i = 0; i < this.horarios.length; i++) {
        let auxHora: Horario = this.horarios[i];
        this.formHoraApertura.controls[i].setValue(this.dividirFechaHoraMinuto(auxHora.horaApertura));
        this.formHoraCierre.controls[i].setValue(this.dividirFechaHoraMinuto(auxHora.horaCierre));
        //FALTA EL SELECTION
      }
    }, error => {
      this.alertService.error();
    }); 
  }
  //Obtener solo hora y minuto para tabla 
  dividirFechaHoraMinuto(cadena: String): String{
    let diahoraMinutos: String[] = cadena.split('T',cadena.length);
    let horaMinutos: String[] = diahoraMinutos[1].split(':',cadena.length);
    return horaMinutos[0]+':'+horaMinutos[1];
  }
  //Obtener formato fecha para horarios
  makeFechaHoraMinuto(fechaComp: String, horaMinutos: String): string{
    let diahoraMinutos: String[] = fechaComp.split('T',fechaComp.length);
    let nuevoHoraMins: String[] = horaMinutos.split(':');
    let nuevaHora: string = diahoraMinutos[0]+'T'+ nuevoHoraMins[0]+':'+nuevoHoraMins[1]+':00';
    return nuevaHora;
  }
  editarFarmacia(): void {
    console.log("Modo Edicion");
    let spinner = this.spinnerService.start('Editando local...');
    this.farmaciaService.updateFarmacia(this.getDataFromTemplate()).subscribe(response => { //Obtengo objeto Farmacia con el método getDataFromTemplate
      this.spinnerService.stop(spinner);
      this.alertService.success('¡Éxito!', 'Local editado correctamente.');
      this.router.navigate(['/pharmacy/locales']);
    }, error => {
      this.spinnerService.stop(spinner);
      this.alertService.error();
    });  
  }
  createOrEdit():void{
    if(this.isEditar ==true){
      this.editarFarmacia();
    }else{
      this.registrarFarmacia();
    }
  }
}
