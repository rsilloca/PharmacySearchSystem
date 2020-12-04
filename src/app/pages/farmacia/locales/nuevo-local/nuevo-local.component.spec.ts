import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoLocalComponent } from './nuevo-local.component';

describe('NuevoLocalComponent', () => {
  let component: NuevoLocalComponent;
  let fixture: ComponentFixture<NuevoLocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoLocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
