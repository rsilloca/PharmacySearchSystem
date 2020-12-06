import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ConfiguracionService } from 'src/app/@services/configuracion.service';
import { UsuarioService } from 'src/app/@services/usuario.service';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';

@Component({
  selector: 'fury-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInUpAnimation]
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  inputType = 'password';
  visible = false;

  constructor(private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private userService: UsuarioService,
    private configuracionService: ConfiguracionService
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
    this.userService.login(usuario, pass).subscribe(res => {
      console.log("response login", res);
    });
    this.router.navigate(['/']);
  }

  getUser() {
    let idUser = this.form.controls['email'].value;
    this.userService.getUsuario(idUser).subscribe(respuesta => {
      console.log('usuario', respuesta);
      if (respuesta == null) {
        console.log('El usuario no existe');
      }
    }, error => {
      console.log('error al obtener usuario', error);
    });
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}
