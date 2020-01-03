import { Component, OnInit, ViewChild, ElementRef, ViewChildren, Renderer2, AfterViewInit, Input } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements AfterViewInit {
  @Input() formGroup:FormGroup;
  @Input() data:any;
  @Input() controlName:string;
  @Input() placeHolder:string;
  
  constructor() {
    
  }
  
}
