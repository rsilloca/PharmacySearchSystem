import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarUbicacionComponent } from './cambiar-ubicacion.component';

describe('CambiarUbicacionComponent', () => {
  let component: CambiarUbicacionComponent;
  let fixture: ComponentFixture<CambiarUbicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambiarUbicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
