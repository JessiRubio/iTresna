import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-file-field',
  templateUrl: './file-field.component.html',
  styleUrls: ['./file-field.component.css']
})
export class FileFieldComponent implements OnInit {
  @Input() formGroup:FormGroup;
  @Input() controlName:string;
  @Input() placeHolder:string;
  private reg:RegExp=new RegExp("[A-Za-z0-1]*.(png|PNG)");
  constructor() { }
  onChange(value){
    let aux:string=value[0].name;
    
    if(this.reg.test(aux)){
      this.formGroup.value[this.controlName]=value[0];
    }
    else{
      window.alert("debe introducir un archivo de tipo .png o .PNG");
      this.formGroup.value[this.controlName]=null;
      this.formGroup.controls[this.controlName].setValue(null);
    }
  }
  ngOnInit() {
    this.formGroup.controls[this.controlName]=new FormControl();
  }

}
