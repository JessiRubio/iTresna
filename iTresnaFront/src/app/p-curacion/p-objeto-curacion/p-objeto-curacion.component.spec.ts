import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PObjetoCuracionComponent } from './p-objeto-curacion.component';

describe('PObjetoCuracionComponent', () => {
  let component: PObjetoCuracionComponent;
  let fixture: ComponentFixture<PObjetoCuracionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PObjetoCuracionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PObjetoCuracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
