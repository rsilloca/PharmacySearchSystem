import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../@services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PharmacyGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthenticationService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isPharmacyUser()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
  
}
