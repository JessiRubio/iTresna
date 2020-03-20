import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PRecuperarContrasenaComponent } from './p-recuperar-contrasena.component';

describe('PRecuperarContrasenaComponent', () => {
  let component: PRecuperarContrasenaComponent;
  let fixture: ComponentFixture<PRecuperarContrasenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PRecuperarContrasenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PRecuperarContrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
