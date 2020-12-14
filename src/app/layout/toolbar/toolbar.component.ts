import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Usuario } from 'src/app/@models/usuario';
import { UsuarioService } from 'src/app/@services/usuario.service';
import { ThemeService } from '../../../@fury/services/theme.service';

@Component({
  selector: 'fury-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input()
  @HostBinding('class.no-box-shadow')
  hasNavigation: boolean;
  @Input() usuario: Usuario;

  @Output() openSidenav = new EventEmitter();
  @Output() openQuickPanel = new EventEmitter();

  topNavigation$ = this.themeService.config$.pipe(map(config => config.navigation === 'top'));

  isPharmacyUser: boolean = false;

  constructor(private themeService: ThemeService, private userService: UsuarioService) {
  }

  ngOnInit() {
    this.isPharmacyUser = this.userService.isPharmacyUser();
  }


}
