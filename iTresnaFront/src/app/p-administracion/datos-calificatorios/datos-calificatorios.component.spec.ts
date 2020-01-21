import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosCalificatoriosComponent } from './datos-calificatorios.component';

describe('DatosCalificatoriosComponent', () => {
  let component: DatosCalificatoriosComponent;
  let fixture: ComponentFixture<DatosCalificatoriosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosCalificatoriosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosCalificatoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
