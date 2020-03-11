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

  onFileChange(event){
    const reader = new FileReader();
    const name=this.controlName;
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        this.formGroup.value[name]=reader.result;
      };
    }
  }
  ngOnInit() {
    this.formGroup.addControl(this.controlName,new FormControl(this.data.desc));
  }
}
