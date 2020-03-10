import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.css']
})
export class NumberInputComponent implements OnInit {

  
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
