import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../clases/usuario';
=======
import { UsuariosService} from '../servicios/usuarios.service';
import { Usuario, Permiso } from '../clases/usuario';
>>>>>>> 77c210cbf376325885e08860908d5f583ae3f8cc

@Component({
  selector: 'app-p-administracion',
  templateUrl: './p-administracion.component.html',
  styleUrls: ['./p-administracion.component.css']
})
export class PAdministracionComponent implements OnInit {

  usuarioLogado:Usuario;

  constructor() { }

  ngOnInit() {
<<<<<<< HEAD
    this.usuarioLogado=JSON.parse(localStorage.getItem("usuario"));
=======
    if(localStorage.getItem("usuario")!=null){
      this.usuarioLogado=JSON.parse(localStorage.getItem("usuario"));
      console.log(this.usuarioLogado);
    }

>>>>>>> 77c210cbf376325885e08860908d5f583ae3f8cc
  }

}