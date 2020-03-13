import { Component, OnInit, Input } from '@angular/core';
import { Comentario } from '../../clases/comentario';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css'],
})
export class ComentariosComponent implements OnInit {
  @Input()
  public comentarios:Comentario[];
  constructor() { }

  ngOnInit() {
    console.log(this.comentarios);
  }

}
