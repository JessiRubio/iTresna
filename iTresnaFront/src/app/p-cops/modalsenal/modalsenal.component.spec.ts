import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalsenalComponent } from './modalsenal.component';

describe('ModalsenalComponent', () => {
  let component: ModalsenalComponent;
  let fixture: ComponentFixture<ModalsenalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalsenalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalsenalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
