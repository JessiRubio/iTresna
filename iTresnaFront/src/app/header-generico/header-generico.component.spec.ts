import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderGenericoComponent } from './header-generico.component';

describe('HeaderGenericoComponent', () => {
  let component: HeaderGenericoComponent;
  let fixture: ComponentFixture<HeaderGenericoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderGenericoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
