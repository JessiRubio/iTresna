import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.css']
})
export class PasswordInputComponent implements OnInit {

  @Input()
  formGroup:FormGroup;
  @Input()
  data:any;
  @Input()
  controlName:string;
  @Input()
  placeHolder:any;

  constructor() { }

  ngOnInit() {
    this.formGroup.addControl(this.controlName,new FormControl(this.data.desc));
  }
}
