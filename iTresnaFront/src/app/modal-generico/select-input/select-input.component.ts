import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.css']
})
export class SelectInputComponent implements OnInit {

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
    this.formGroup.addControl(this.controlName,new FormControl(this.data.seleccionado));
  }

}
