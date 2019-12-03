import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOverflowComponent } from './menu-overflow.component';

describe('MenuOverflowComponent', () => {
  let component: MenuOverflowComponent;
  let fixture: ComponentFixture<MenuOverflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuOverflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuOverflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
