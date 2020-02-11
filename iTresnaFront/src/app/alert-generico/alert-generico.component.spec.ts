import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertGenericoComponent } from './alert-generico.component';

describe('AlertGenericoComponent', () => {
  let component: AlertGenericoComponent;
  let fixture: ComponentFixture<AlertGenericoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertGenericoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
