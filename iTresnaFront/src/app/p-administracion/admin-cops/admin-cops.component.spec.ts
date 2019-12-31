import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCopsComponent } from './admin-cops.component';

describe('AdminCopsComponent', () => {
  let component: AdminCopsComponent;
  let fixture: ComponentFixture<AdminCopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
