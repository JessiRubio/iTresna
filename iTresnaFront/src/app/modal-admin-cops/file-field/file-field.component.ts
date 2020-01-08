import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-file-field',
  templateUrl: './file-field.component.html',
  styleUrls: ['./file-field.component.css']
})
export class FileFieldComponent implements OnInit {
  @Input() formGroup:FormGroup;
  @Input() data:any;
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
