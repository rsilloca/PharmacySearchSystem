import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/@services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [FormBuilder]
})
export class LoginComponent implements OnInit {

  hide: boolean = true;
  formLoginPatient: FormGroup;
  formLoginPharmacy: FormGroup;

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private authService: AuthenticationService,
    private router: Router, private formBuilder: FormBuilder) {
    iconRegistry.addSvgIcon(
      'logo',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/search.svg'));
  }

  ngOnInit(): void {
    this.formLoginPatient = this.formBuilder.group({});
    this.formLoginPharmacy = this.formBuilder.group({});
  }

  public loginPatient() {
    this.authService.login(false, "", "");
    this.router.navigate(['/']);
  }

  public loginPharmacy() {
    this.authService.login(true, "", "");
    this.router.navigate(['/pharmacy']);
  }

}
