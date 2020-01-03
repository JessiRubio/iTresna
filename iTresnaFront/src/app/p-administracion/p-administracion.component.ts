import { Component, OnInit } from '@angular/core';
import { UsuariosService} from '../servicios/usuarios.service';
import { Usuario, Permiso } from '../clases/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-p-administracion',
  templateUrl: './p-administracion.component.html',
  styleUrls: ['./p-administracion.component.css']
})
export class PAdministracionComponent implements OnInit {

  usuarioLogado:Usuario;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    if(localStorage.getItem("usuario")!=null){
      this.usuarioLogado=JSON.parse(localStorage.getItem("usuario"));
      console.log(this.usuarioLogado);

      if(this.usuarioLogado.tip_usuario!==1){
        this.router.navigateByUrl("Principal");
      }
    }

    

  }

}