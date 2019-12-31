import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PAdOrganizacionesComponent } from './p-ad-organizaciones.component';

describe('PAdOrganizacionesComponent', () => {
  let component: PAdOrganizacionesComponent;
  let fixture: ComponentFixture<PAdOrganizacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PAdOrganizacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PAdOrganizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
