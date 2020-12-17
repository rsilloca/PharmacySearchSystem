import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCarritoComponent } from './item-carrito.component';

describe('ItemCarritoComponent', () => {
  let component: ItemCarritoComponent;
  let fixture: ComponentFixture<ItemCarritoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCarritoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
