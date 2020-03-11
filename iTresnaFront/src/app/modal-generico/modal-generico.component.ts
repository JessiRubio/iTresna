import { Component, OnInit, Input } from '@angular/core';

import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-modal-generico',
  templateUrl: './modal-generico.component.html',
  styleUrls: ['./modal-generico.component.css']
})
export class ModalGenericoComponent implements OnInit {

  @Input()
  public dataConfiguration:Array<{input:string,controlName:string,placeHolder:string,data:Array<any>}>;
  @Input()
  public tituloModal:string;
  @Input()
  public botonFinalizar:string;

  private formGroup:FormGroup;

  constructor(
    private modal: NgbActiveModal,
    private formBuilder: FormBuilder,) {
      this.formGroup=this.formBuilder.group({});
  }

  ngOnInit(){
    
  }

  //Se usa en el html
  private close(){
    if(this.formGroup.pristine){
      this.modal.close(null);
    }else{
      this.modal.close(this.formGroup.value);
    }
  }
}
