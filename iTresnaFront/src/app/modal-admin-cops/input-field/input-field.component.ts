import { Component, AfterViewInit, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit {
  @Input() formGroup:FormGroup;
  @Input() data:any;
  @Input() controlName:string;
  @Input() placeHolder:string;
  
  constructor(
    private formBuilder:FormBuilder
  ) {
    
  }
  ngOnInit(){
    this.formGroup.controls[this.controlName]=new FormControl();
  }
}

