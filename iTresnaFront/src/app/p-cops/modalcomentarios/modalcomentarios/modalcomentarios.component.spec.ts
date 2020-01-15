import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalcomentariosComponent } from './modalcomentarios.component';

describe('ModalcomentariosComponent', () => {
  let component: ModalcomentariosComponent;
  let fixture: ComponentFixture<ModalcomentariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalcomentariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalcomentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
