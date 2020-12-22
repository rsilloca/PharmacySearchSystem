import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/@models/usuario';

@Component({
  selector: 'fury-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent implements OnInit {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<MiPerfilComponent>,
    @Inject(MAT_DIALOG_DATA) public usuario: Usuario, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: [this.usuario.nombre || ""],
      apePat: [this.usuario.apePat || ""],
      apeMat: [this.usuario.apeMat || ""],
      correo: [this.usuario.correo || ""],
      idTipoDocumento: [this.usuario.idTipoDocumento || null],
      documento: [this.usuario.documento || ""]
    });
  }

  saveChanges() {
    let user = new Usuario(this.form.value);
    user.idUsuario = this.usuario.idUsuario;
    this.dialogRef.close(user);
  }

}
