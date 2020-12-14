import { MapsAPILoader } from '@agm/core';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LATITUD_DEFAULT, LONGITUD_DEFAULT, TYPE_LOCATION_AUTOMATIC } from 'src/app/@constants/constantes';
import { Farmacia } from 'src/app/@models/farmacia';
import { Usuario } from 'src/app/@models/usuario';
import { UsuarioService } from 'src/app/@services/usuario.service';
import { FarmaciaModule } from 'src/app/pages/farmacia/farmacia.module';

declare const google: any;
@Component({
  selector: 'fury-ver-ruta',
  templateUrl: './ver-ruta.component.html',
  styleUrls: ['./ver-ruta.component.scss']
})
export class VerRutaComponent implements OnInit {

  lat = LATITUD_DEFAULT;
  lng = LONGITUD_DEFAULT;
  zoom = 17;
  private directionsRenderer: any;
  private directionsService: any;
  wayPoints: any[] = [];
  location = true;
  usuario: Usuario;
  farmacia: Farmacia;

  constructor(public dialogRef: MatDialogRef<VerRutaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UsuarioService,
    private mapsAPILoader: MapsAPILoader) {
    this.mapsAPILoader.load().then(() => {
      this.directionsService = new google.maps.DirectionsService;
      this.directionsRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: true });
    });
  }

  ngOnInit(): void {
    let type = this.userService.getTypeLocation();
    this.usuario = this.data.usuario;
    this.farmacia = this.data.farmacia;
    console.log('user', this.usuario);
    if (+type == TYPE_LOCATION_AUTOMATIC) {
      this.userService.getNavigatorGeolocation().then(location => {
        this.lat = location.latitud;
        this.lng = location.longitud;
      });
    } else {
      let locationUser = this.userService.getLocation();
      this.lat = locationUser[0];
      this.lng = locationUser[1];
    }
    this.getTracking();
  }

  onMapReady(map) {
    console.log('mapLoaded event called!', map);
    this.directionsRenderer.setMap(map);
  }

  getTracking() {
    if (this.location) {
      this.getRuta();
      this.location = false;
    }
  }

  getRuta() {
    var directionsService = this.directionsService;
    var directionsDisplay = this.directionsRenderer;
    directionsDisplay.setOptions({
      polylineOptions: {
        strokeWeight: 7,
        strokeOpacity: 0.7,
        strokeColor: '#00468c'
      }
    });
    directionsService.route({
      origin: { lat: this.lat, lng: this.lng },
      destination: { lat: this.farmacia.latitud, lng: this.farmacia.longitud },
      waypoints: [],
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,

    }, function (response, status) {
      if (status === 'OK') {
        console.log('drawing');
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }


}
