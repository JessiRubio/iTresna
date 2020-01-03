import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-file-field',
  templateUrl: './file-field.component.html',
  styleUrls: ['./file-field.component.css']
})
export class FileFieldComponent implements OnInit {
  @Input() form:FormGroup;
  @Input() data:any;
  @Input() controlName:string;
  @Input() placeHolder:string;
  constructor() { }

  ngOnInit() {
  }

}
