import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PAdministracionComponent } from './p-administracion.component';

describe('PAdministracionComponent', () => {
  let component: PAdministracionComponent;
  let fixture: ComponentFixture<PAdministracionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PAdministracionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PAdministracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
