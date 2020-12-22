import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarConfirmacionComponent } from './eliminar-confirmacion.component';

describe('EliminarConfirmacionComponent', () => {
  let component: EliminarConfirmacionComponent;
  let fixture: ComponentFixture<EliminarConfirmacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarConfirmacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarConfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
