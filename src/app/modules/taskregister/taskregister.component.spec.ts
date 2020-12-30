import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskregisterComponent } from './taskregister.component';

describe('TaskregisterComponent', () => {
  let component: TaskregisterComponent;
  let fixture: ComponentFixture<TaskregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
