import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DOC_DNI, TYPE_PATIENT } from 'src/app/@constants/constantes';
import { Rol } from 'src/app/@models/rol';
import { Usuario } from 'src/app/@models/usuario';
import { UsuarioService } from 'src/app/@services/usuario.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { SpinnerService } from 'src/app/shared/spinner.service';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';

@Component({
  selector: 'fury-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [fadeInUpAnimation]
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  visible = false;

  tiposDocumento: any[] = [
    { id: 1, value: 'DNI' },
    { id: 2, value: 'RUC' }
  ];

  constructor(private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private userService: UsuarioService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private spinnerService: SpinnerService,
    private alertService: AlertService
  ) {
    iconRegistry.addSvgIcon(
      'logo-sbf',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/search.svg'));
  }

  ngOnInit() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      clave: ['', Validators.required],
      claveConfirmacion: ['', Validators.required]
    });
  }

  registrar() {
    if (this.form.invalid) return;
    let spinner = this.spinnerService.start("Registrando...");
    let rol: Rol = new Rol();
    rol.idRol = +TYPE_PATIENT;
    let usuario: Usuario = new Usuario(this.form.value);
    usuario.idTipoDocumento = DOC_DNI;
    usuario.documento = "00000000";
    usuario.roles = [rol];
    usuario.usuario1 = usuario.correo;
    this.userService.createUsuario(usuario).subscribe(response => {
      this.spinnerService.stop(spinner);
      this.router.navigate(['/']);
    }, error => {
      this.alertService.error("Ocurrió un error al registrarte. :c");
    });
  }
}
