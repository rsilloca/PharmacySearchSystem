import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/@models/usuario';
import { UsuarioService } from 'src/app/@services/usuario.service';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';

@Component({
  selector: 'fury-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [fadeInUpAnimation]
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  inputType = 'password';
  visible = false;

  tiposDocumento: any[] = [
    { id: 1, value: 'DNI' },
    { id: 2, value: 'RUC'}
  ];

  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private userService: UsuarioService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      tipoDoc: [1, Validators.required],
      numDoc: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });
  }

  registrar() {
    if (this.form.invalid) return;
    let usuario: Usuario = new Usuario();
    usuario.nombre = this.form.controls['name'].value;
    let apellidos: string = this.form.controls['lastName'].value;
    let apePat = apellidos.split(' ')[0];
    let apeMat = apellidos.split(' ').length > 2 ? apellidos.substring(apellidos.indexOf(' '), apellidos.length - 1) : apellidos.split(' ')[1];
    usuario.apeMat = apeMat;
    usuario.apePat = apePat;
    usuario.idTipoDocumento = this.form.controls['tipoDoc'].value;
    usuario.documento = this.form.controls['numDoc'].value;
    usuario.correo = this.form.controls['email'].value;
    usuario.clave = this.form.controls['password'].value;
    console.log('enviando usuario', usuario);
    this.userService.createUsuario(usuario).subscribe(response => {
      console.log('response crear usuario', response);
    });
    // this.router.navigate(['/']);
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
