import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkbox-field',
  templateUrl: './checkbox-field.component.html',
  styleUrls: ['./checkbox-field.component.css']
})
export class CheckboxFieldComponent implements OnInit {

  @Input() formGroup:FormGroup;
  @Input() data:boolean;
  @Input() controlName:string;
  @Input() placeHolder:string;
  constructor() { }
  onChange(value){
    this.formGroup.value[this.controlName]=value;
  }
  ngOnInit() {
    this.formGroup.controls[this.controlName]=new FormControl();
  }
}
