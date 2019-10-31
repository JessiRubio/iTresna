import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PEspaciosComponent } from './p-espacios.component';

describe('PEspaciosComponent', () => {
  let component: PEspaciosComponent;
  let fixture: ComponentFixture<PEspaciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PEspaciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PEspaciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
