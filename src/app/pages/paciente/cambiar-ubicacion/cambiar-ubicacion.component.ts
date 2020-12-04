import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fury-cambiar-ubicacion',
  templateUrl: './cambiar-ubicacion.component.html',
  styleUrls: ['./cambiar-ubicacion.component.scss']
})
export class CambiarUbicacionComponent implements OnInit {

  lat = 19.290950;
  lng = -99.653015;
  zoom = 9;

  constructor() { }

  ngOnInit(): void {
  }

}
