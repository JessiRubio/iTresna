import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdminCopsComponent } from './modal-admin-cops.component';

describe('ModalAdminCopsComponent', () => {
  let component: ModalAdminCopsComponent;
  let fixture: ComponentFixture<ModalAdminCopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAdminCopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAdminCopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
