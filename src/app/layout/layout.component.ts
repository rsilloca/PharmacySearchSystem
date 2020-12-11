import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SidebarDirective } from '../../@fury/shared/sidebar/sidebar.directive';
import { SidenavService } from './sidenav/sidenav.service';
import { filter, map, startWith } from 'rxjs/operators';
import { ThemeService } from '../../@fury/services/theme.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { checkRouterChildsData } from '../../@fury/utils/check-router-childs-data';
import { MatDialog } from '@angular/material/dialog';
import { FiltroComponent } from '../pages/paciente/busqueda/filtro/filtro.component';
import { UsuarioService } from '../@services/usuario.service';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'fury-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  @ViewChild('configPanel', { static: true }) configPanel: SidebarDirective;

  sidenavOpen$ = this.sidenavService.open$;
  sidenavMode$ = this.sidenavService.mode$;
  sidenavCollapsed$ = this.sidenavService.collapsed$;
  sidenavExpanded$ = this.sidenavService.expanded$;
  quickPanelOpen: boolean;

  sideNavigation$ = this.themeService.config$.pipe(map(config => config.navigation === 'side'));
  topNavigation$ = this.themeService.config$.pipe(map(config => config.navigation === 'top'));
  toolbarVisible$ = this.themeService.config$.pipe(map(config => config.toolbarVisible));
  toolbarPosition$ = this.themeService.config$.pipe(map(config => config.toolbarPosition));
  footerPosition$ = this.themeService.config$.pipe(map(config => config.footerPosition));

  scrollDisabled$ = this.router.events.pipe(
    filter<NavigationEnd>(event => event instanceof NavigationEnd),
    startWith(null),
    map(() => checkRouterChildsData(this.router.routerState.root.snapshot, data => data.scrollDisabled))
  );

  isPharmacyUser: boolean = false;
  isMobile: boolean;

  constructor(private sidenavService: SidenavService,
    private themeService: ThemeService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private userService: UsuarioService,
    private mediaObserver: MediaObserver) { }

  ngOnInit() {
    this.isPharmacyUser = this.userService.isPharmacyUser();
  }

  ngAfterContentInit(): void {
    this.mediaObserver.asObservable().subscribe((changes: MediaChange[]) => {
      this.isMobile = changes[0].mqAlias == 'sm' || changes[0].mqAlias == 'xs';
      if (this.isMobile) {
        this.themeService.setToolbarPosition("fixed");
      } else {
        this.themeService.setToolbarPosition("above-fixed");
      }
    });
  }

  openQuickPanel() {
    this.quickPanelOpen = true;
  }

  openConfigPanel() {
    this.configPanel.open();
  }

  closeSidenav() {
    this.sidenavService.close();
  }

  openSidenav() {
    if (this.isMobile) {
      this.sidenavService.open();
    } else {
      this.sidenavService.toggleCollapsed();
    }
  }

  ngOnDestroy(): void { }

  abrirFiltro() {
    let dialogFiltro = this.dialog.open(FiltroComponent, {
      width: '30rem'
    });
  }

}

