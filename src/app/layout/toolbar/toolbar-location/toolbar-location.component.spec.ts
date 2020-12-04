import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarLocationComponent } from './toolbar-location.component';

describe('ToolbarLocationComponent', () => {
  let component: ToolbarLocationComponent;
  let fixture: ComponentFixture<ToolbarLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
