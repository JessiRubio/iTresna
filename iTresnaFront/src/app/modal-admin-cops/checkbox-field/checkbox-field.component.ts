import { Component, OnInit, Input, AfterViewInit, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkbox-field',
  templateUrl: './checkbox-field.component.html',
  styleUrls: ['./checkbox-field.component.css']
})
export class CheckboxFieldComponent implements OnInit {

  @Input() formGroup:FormGroup;
  @Input() data:any;
  @Input() controlName:string;
  @Input() placeHolder:string;
  constructor(private cd:ChangeDetectorRef) { }
  onChange(value){
    this.formGroup.value[this.controlName]=value;
  }
  ngOnInit() {
    this.formGroup.controls[this.controlName]=new FormControl(this.data.desc);
  }
}
