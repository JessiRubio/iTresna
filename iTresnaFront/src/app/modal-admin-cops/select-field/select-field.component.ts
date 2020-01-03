import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { format } from 'path';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.css']
})
export class SelectFieldComponent implements OnInit {
  @Input() form:FormGroup;
  @Input() data:any[];
  @Input() controlName:string="";
  @Input() placeHolder:string="";
  private selected:number=0;
  constructor() {
  }

  ngOnInit() {
  }
}
