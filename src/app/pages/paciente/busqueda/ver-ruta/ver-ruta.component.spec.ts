import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerRutaComponent } from './ver-ruta.component';

describe('VerRutaComponent', () => {
  let component: VerRutaComponent;
  let fixture: ComponentFixture<VerRutaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerRutaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
