import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.css']
})
export class SelectFieldComponent implements OnInit {
  @Input() formGroup:FormGroup;
  @Input() data:any[];
  @Input() controlName:string="";
  @Input() placeHolder:string="";
  private selected:number=0;
  constructor() {
  }

  ngOnInit() {
    this.formGroup.controls[this.controlName]=new FormControl();
  }
}
