import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Farmacia } from 'src/app/@models/farmacia';
import { FiltroLocales } from 'src/app/@models/filtro-locales';
import { FarmaciaService } from 'src/app/@services/farmacia.service';
import { UsuarioService } from 'src/app/@services/usuario.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { SpinnerService } from 'src/app/shared/spinner.service';

//Tabla de horarios
export interface LocalTable {
  position: number;
  name: string;
  address: string;
  opening: string[];
  closed: number;

}

const ELEMENT_DATA: LocalTable[] = [
  { position: 1, name: 'Inkafarma', address: 'Sachaca', opening: ['9:00'], closed: 0 },
  { position: 2, name: 'Mifarma', address: 'Sachaca', opening: ['9:00'], closed: 5 },
  { position: 3, name: 'Angel', address: 'Sachaca', opening: ['9:00'], closed: 4 },
  { position: 4, name: 'Botica Perú', address: 'Sachaca', opening: ['9:00'], closed: 3 },
  { position: 5, name: 'ByS', address: 'Sachaca', opening: ['9:00'], closed: 2 },
  { position: 6, name: 'Arcangel', address: 'Sachaca', opening: ['9:00'], closed: 1 },
];

@Component({
  selector: 'fury-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.scss']
})
export class LocalesComponent implements OnInit {

  locales: Farmacia[];
  formFiltro: FormGroup;

  //CLASE TABLA
  displayedColumns: string[] = ['position', 'name', 'address', 'opening', 'closed', 'action'];
  dataSource = new MatTableDataSource<LocalTable>(ELEMENT_DATA);

  constructor(private userService: UsuarioService, private farmaciaService: FarmaciaService,
    private fb: FormBuilder, private spinnerService: SpinnerService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.formFiltro = this.fb.group({
      nombre: [''],
      direccion: ['']
    });
  }
  buscarLocales(): void {
    let spinner = this.spinnerService.start('Buscando...');
    let filtros = new FiltroLocales(this.formFiltro.value);
    filtros.idUsuario = (this.userService.currentUser() as any).IdUsuario;
    filtros.pagina = 0;
    filtros.regxpag = 10;
    filtros.radio = 1000000000;
    this.farmaciaService.getFarmaciaFiltros(filtros).subscribe(response => {
      // console.log("Locales", response);
      this.locales = (response as any).data;
      this.spinnerService.stop(spinner);
    }, error => {
      this.spinnerService.stop(spinner);
      this.alertService.error();
    });
  }
}
