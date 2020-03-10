import { Component, OnInit, Input } from '@angular/core';
import {NgbAlertConfig, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Alerta } from '../clases/alerta';

@Component({
  selector: 'app-alert-generico',
  templateUrl: './alert-generico.component.html',
  styleUrls: ['./alert-generico.component.css'],
  providers: [NgbAlertConfig]
})
export class AlertGenericoComponent implements OnInit {

  modal:NgbActiveModal;
  alert:Alerta;

  constructor(
    activeModal:NgbActiveModal
    ) {
    this.modal=activeModal;
  }

  ngOnInit() {

  }
  close(){
    this.modal.close();
  }
}
