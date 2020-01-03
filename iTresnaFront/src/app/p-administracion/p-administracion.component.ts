import { Component, OnInit } from '@angular/core';
import { UsuariosService} from '../servicios/usuarios.service';
import { Usuario, Permiso } from '../clases/usuario';

@Component({
  selector: 'app-p-administracion',
  templateUrl: './p-administracion.component.html',
  styleUrls: ['./p-administracion.component.css']
})
export class PAdministracionComponent implements OnInit {

  usuarioLogado:Usuario;

  constructor() { }

  ngOnInit() {
    if(localStorage.getItem("usuario")!=null){
      this.usuarioLogado=JSON.parse(localStorage.getItem("usuario"));
      console.log(this.usuarioLogado);
    }

  }

}
