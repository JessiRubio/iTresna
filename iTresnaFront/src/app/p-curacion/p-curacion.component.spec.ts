import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PCuracionComponent } from './p-curacion.component';

describe('PCuracionComponent', () => {
  let component: PCuracionComponent;
  let fixture: ComponentFixture<PCuracionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PCuracionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PCuracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
