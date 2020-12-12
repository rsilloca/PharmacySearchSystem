import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TYPE_LOCATION_AUTOMATIC, TYPE_PATIENT, TYPE_PHARMACY } from 'src/app/@constants/constantes';
import { ConfiguracionService } from 'src/app/@services/configuracion.service';
import { UsuarioService } from 'src/app/@services/usuario.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { SpinnerService } from 'src/app/shared/spinner.service';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';

@Component({
  selector: 'fury-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInUpAnimation]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  visible = false;
  location: any[] = [0, 0];

  constructor(private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private userService: UsuarioService,
    private alertService: AlertService,
    private spinnerService: SpinnerService
  ) {
    iconRegistry.addSvgIcon(
      'logo-sbf',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/search.svg'));
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.form.invalid) return;
    let usuario = this.form.controls['email'].value;
    let pass = this.form.controls['password'].value;
    let spinner = this.spinnerService.start('Iniciando sesión');
    this.userService.login(usuario, pass).subscribe(res => {
      console.log("response login", res);
      if (this.userService.isPharmacyUser()) {
        this.spinnerService.stop(spinner);
        this.router.navigate(['/pharmacy']);
      } else {
        this.spinnerService.stop(spinner);
        this.router.navigate(['/']);
      }
    }, error => {
      console.log('usuario no válido');
      this.spinnerService.stop(spinner);
      this.alertService.error('Error', 'El usuario ingresado no es válido');
    });
  }

}
