import { Component, OnInit, Input } from '@angular/core';
import { Comentario } from '../../clases/comentario';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css'],
})
export class ComentariosComponent implements OnInit {
  @Input()
  public comentarios:Comentario[];
  modal:NgbActiveModal;
  constructor( activemodal:NgbActiveModal) {
    this.modal=activemodal;
   }

  ngOnInit() {
  }

}
