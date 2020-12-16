import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmaciaBusquedaComponent } from './farmacia-busqueda.component';

describe('FarmaciaBusquedaComponent', () => {
  let component: FarmaciaBusquedaComponent;
  let fixture: ComponentFixture<FarmaciaBusquedaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmaciaBusquedaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmaciaBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
