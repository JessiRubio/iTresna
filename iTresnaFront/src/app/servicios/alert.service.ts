import { Injectable } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {AlertGenericoComponent} from "../alert-generico/alert-generico.component";
import { Alerta } from '../clases/alerta';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private modalService:NgbModal) { }

  abrirAlerta(alerta:Alerta){
    let modalRef:NgbModalRef;
    modalRef=this.modalService.open(AlertGenericoComponent, {centered:true});
    (<AlertGenericoComponent>modalRef.componentInstance).alert=alerta;
  }
}
