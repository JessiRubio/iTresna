import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.css']
})
export class PasswordFieldComponent implements OnInit {
  @Input() formGroup:FormGroup;
  @Input() data:any;
  @Input() controlName:string;
  @Input() placeHolder:string;
  

  constructor(private formBuilder:FormBuilder) { }

  onChange(value){
    this.formGroup.value[this.controlName]=value;
  }
  ngOnInit(){
    this.formGroup.controls[this.controlName]=new FormControl(this.data.desc);
  }

  

}
