import { Injectable } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalGenericoComponent } from '../modal-generico/modal-generico.component';
import { timeout } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {

  constructor(private modalService:NgbModal) { }

  abrirModal(config:{data:any,titulo:string,botonFin:string}):Promise<any>{
    //TODO Options to, data config, inputs, etc.
    var modalRef = this.modalService.open(ModalGenericoComponent,{centered:true,scrollable:true,size:"lg"});
    var instance:ModalGenericoComponent=modalRef.componentInstance;
    instance.dataConfiguration=config.data;
    instance.tituloModal=config.titulo;
    instance.botonFinalizar=config.botonFin;
    return modalRef.result;
  }

  abrirModalCuracion(config:{data:any,titulo:string,label:string,botonFin:string,botonCancel:string}):Promise<any>{
    //TODO Options to, data config, inputs, etc.
    var modalRef = this.modalService.open(ModalGenericoComponent,{centered:true,scrollable:true,size:"lg"});
    var instance:ModalGenericoComponent=modalRef.componentInstance;
    instance.dataConfiguration=config.data;
    instance.tituloModal=config.titulo;
    instance.labelModal=config.label;
    instance.botonFinalizar=config.botonFin;
    instance.botonCancelar=config.botonCancel;
    return modalRef.result;
  }



}
