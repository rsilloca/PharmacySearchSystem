import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../@services/authentication.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  showSide: boolean = false;
  pharmacyUser: boolean = false;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.pharmacyUser = this.authService.isPharmacyUser();
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
