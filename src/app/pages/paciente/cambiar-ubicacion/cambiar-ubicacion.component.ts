import { GoogleMapsAPIWrapper, MapsAPILoader, MouseEvent } from '@agm/core';
import { google } from '@agm/core/services/google-maps-types';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'fury-cambiar-ubicacion',
  templateUrl: './cambiar-ubicacion.component.html',
  styleUrls: ['./cambiar-ubicacion.component.scss']
})
export class CambiarUbicacionComponent implements OnInit {

  lat = 19.290950;
  lng = -99.653015;
  zoom = 9;

  constructor(private fromBuilder: FormBuilder, private mapsApi: MapsAPILoader) { }

  ngOnInit(): void {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position =>{
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


}

