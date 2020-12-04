import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fury-ver-ruta',
  templateUrl: './ver-ruta.component.html',
  styleUrls: ['./ver-ruta.component.scss']
})
export class VerRutaComponent implements OnInit {

  lat = 19.290950;
  lng = -99.653015;
  zoom = 9;
  
  constructor() { }

  ngOnInit(): void {
  }

}
