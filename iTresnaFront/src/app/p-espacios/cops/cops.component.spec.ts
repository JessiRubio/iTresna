import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Component} from '@angular/core'

import { CopsComponent } from './cops.component';
import { from } from 'rxjs';

describe('CopsComponent', () => {
  let component: CopsComponent;
  let fixture: ComponentFixture<CopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



