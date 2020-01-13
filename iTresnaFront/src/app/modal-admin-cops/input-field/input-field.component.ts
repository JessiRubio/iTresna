import { Component, AfterViewInit, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit,AfterViewInit {
  @Input() formGroup:FormGroup;
  @Input() data:any;
  @Input() controlName:string;
  @Input() placeHolder:string;
  
  constructor(
    private formBuilder:FormBuilder,
    private cd:ChangeDetectorRef
  ) {
    
  }
  onChange(value){
    this.formGroup.value[this.controlName]=value;
  }
  ngOnInit(){
    this.formGroup.controls[this.controlName]=new FormControl(this.data.desc,Validators.required);
  }
  ngAfterViewInit(){
  }
}

