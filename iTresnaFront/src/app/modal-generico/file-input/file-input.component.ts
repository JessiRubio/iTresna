import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css']
})
export class FileInputComponent implements OnInit {

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
