import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PCopsComponent } from './p-cops.component';

describe('PCopsComponent', () => {
  let component: PCopsComponent;
  let fixture: ComponentFixture<PCopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PCopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PCopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
