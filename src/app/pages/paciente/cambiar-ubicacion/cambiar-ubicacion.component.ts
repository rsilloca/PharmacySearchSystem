import { GoogleMapsAPIWrapper, MapsAPILoader, MouseEvent } from '@agm/core';
import { google } from '@agm/core/services/google-maps-types';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LATITUD_DEFAULT, LOCATION_NAME, LONGITUD_DEFAULT, TYPE_LOCATION_AUTOMATIC } from 'src/app/@constants/constantes';
import { UsuarioService } from 'src/app/@services/usuario.service';

@Component({
  selector: 'fury-cambiar-ubicacion',
  templateUrl: './cambiar-ubicacion.component.html',
  styleUrls: ['./cambiar-ubicacion.component.scss']
})
export class CambiarUbicacionComponent implements OnInit {

  lat = LATITUD_DEFAULT;
  lng = LONGITUD_DEFAULT;
  zoom = 17;
  form: FormGroup;

  constructor(private fromBuilder: FormBuilder, private mapsApi: MapsAPILoader, private fb: FormBuilder,
    private userService: UsuarioService, private dialogRef: MatDialogRef<CambiarUbicacionComponent>) { }

  ngOnInit(): void {
    let ubicacionAutomatica = +this.userService.getTypeLocation() == TYPE_LOCATION_AUTOMATIC;
    console.log('tipo', ubicacionAutomatica);
    this.form = this.fb.group({
      tipo: [ubicacionAutomatica],
      coords: ['']
    });
    this.setLocation();
    this.form.controls['tipo'].valueChanges.subscribe(change => {
      if (change) this.getCurrentLocation();
    });
  }

  setLocation() {
    if (this.form.controls['tipo'].value) {
      this.getCurrentLocation();
    } else {
      let location = this.userService.getLocation();
      this.lat = location[0];
      this.lng = location[1];
      this.updateCoordsForm();
    }
  }

  getCurrentLocation() {
    this.userService.getNavigatorGeolocation().then(location => {
      this.lat = location.latitud;
      this.lng = location.longitud;
      this.updateCoordsForm();
    });
  }

  markerDragEnd(evt: MouseEvent) {
    this.lat = evt.coords.lat;
    this.lng = evt.coords.lng;
    this.updateCoordsForm();
  }

  saveLocation() {
    if (!this.form.controls['tipo'].value) {
      this.userService.saveLocation(this.lat, this.lng);
    } else {
      return; // Temp for insecure server
      // localStorage.removeItem(LOCATION_NAME);
      // this.userService.setTypeLocation(TYPE_LOCATION_AUTOMATIC);
    }
    this.dialogRef.close();
  }

  updateCoordsForm() {
    this.form.controls['coords'].setValue(this.lat + ", " + this.lng);
  }

}

