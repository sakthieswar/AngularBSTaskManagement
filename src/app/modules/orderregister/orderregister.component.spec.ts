import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderregisterComponent } from './orderregister.component';

describe('OrderregisterComponent', () => {
  let component: OrderregisterComponent;
  let fixture: ComponentFixture<OrderregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
