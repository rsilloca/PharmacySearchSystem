import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Farmacia } from 'src/app/@models/farmacia';
import { FiltroLocales } from 'src/app/@models/filtro-locales';
import { FarmaciaService } from 'src/app/@services/farmacia.service';
import { UsuarioService } from 'src/app/@services/usuario.service';

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
  { position: 3, name: 'Angel', address: 'Sachaca', opening: ['9:00'],closed: 4  },
  { position: 4, name: 'Botica Perú', address: 'Sachaca', opening: ['9:00'],closed: 3 },
  { position: 5, name: 'ByS', address: 'Sachaca', opening: ['9:00'], closed: 2  },
  { position: 6, name: 'Arcangel', address: 'Sachaca', opening:['9:00'], closed: 1  },
];

@Component({
  selector: 'fury-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.scss']
})
export class LocalesComponent implements OnInit {

  filtros:FiltroLocales=new FiltroLocales(); 
  locales:Farmacia[];

  //CLASE TABLA
  displayedColumns: string[] = ['position', 'name', 'address', 'opening', 'closed', 'action'];
  dataSource = new MatTableDataSource<LocalTable>(ELEMENT_DATA);

  constructor(private userService:UsuarioService,private farmaciaService:FarmaciaService) { }

  ngOnInit(): void {
  }
  buscarLocales():void{
    this.filtros.idUsuario=(this.userService.currentUser() as any).IdUsuario;
    this.filtros.pagina=0;
    this.filtros.regxpag=10;
    this.filtros.radio=10000;
    this.farmaciaService.getFarmaciaFiltros(this.filtros).subscribe(response => 
      {
        console.log("Locales",response);
        this.locales=(response as any).data;
      });
  }
}
