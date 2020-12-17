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
      automaticLocation: [true],
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
      console.log("Modo Edicion");
      this.obtenerDatos();
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
    //console.log("lat" + this.lat);
    //console.log("lng" + this.lng);
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
  registrarFarmacia() {
    if (this.form.invalid) return;
    let spinner = this.spinnerService.start('Registrando local...');
    let farmacia: Farmacia = new Farmacia(this.form.value);
    let moneda: Moneda = new Moneda();
    moneda.idMoneda = 1;
    let horario: Horario[] = [];
    let usuario: Usuario = this.usuarioService.currentUserSBF();
    for (let i = 0; i < this.formHoraApertura.value.length; i++) {
      let haux = new Horario();
      haux.diaSemana = i;
      haux.horaApertura = this.formHoraApertura.value[i];
      haux.horaCierre = this.formHoraCierre.value[i];
      haux.logEstado = this.selection.isSelected(this.horarios[i]) ? 1 : 0;
      horario.push(haux);
    }
    farmacia.latitud = this.lat;
    farmacia.longitud = this.lng;
    farmacia.usuarioFarmacia = [usuario];
    farmacia.horarios = horario;
    farmacia.monedas = moneda;
    farmacia.idMoneda = moneda.idMoneda;
    // console.log('farmacia enviada', farmacia);
    this.farmaciaService.createFarmacia(farmacia).subscribe(response => {
      // console.log('response crear farmacia', response);
      this.spinnerService.stop(spinner);
      this.alertService.success('¡Éxito!', 'Local registrado correctamente.');
      this.router.navigate(['/pharmacy/locales']);
    }, error => {
      this.spinnerService.stop(spinner);
      this.alertService.error();
    });
  }

  obtenerDatos(): void {
    this.farmaciaService.getFarmacia(this.idFarmacia).subscribe(response => {
      console.log("Farmacia Encontrada", response);
    });
  }

}
