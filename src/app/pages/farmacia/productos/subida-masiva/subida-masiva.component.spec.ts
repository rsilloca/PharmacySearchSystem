import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubidaMasivaComponent } from './subida-masiva.component';

describe('SubidaMasivaComponent', () => {
  let component: SubidaMasivaComponent;
  let fixture: ComponentFixture<SubidaMasivaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubidaMasivaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubidaMasivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
