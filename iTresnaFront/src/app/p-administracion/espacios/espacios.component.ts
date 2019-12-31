import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { EspaciosItem } from '../../clases/espaciosItem';
import { EspaciosService } from '../../servicios/espacios.service';
import { UsuariosService } from '../../servicios/usuarios.service';

@Component({
  selector: 'app-espacios',
  templateUrl: './espacios.component.html',
  styleUrls: ['./espacios.component.css']
})
export class EspaciosComponent implements OnInit {

  usuarioLogado:Usuario;
  cod_org:number;
  listaEspacios:EspaciosItem[];
  constructor(private espaciosService:EspaciosService,
    private usuarioService:UsuariosService) 
    { 
      this.listaEspacios=[];
    }

  ngOnInit() {
    this.usuarioLogado=JSON.parse(localStorage.getItem("usuario"));
    this.cod_org=this.usuarioLogado.cod_org;
    this.cargarListaEspacios();
    
  }

  cargarListaEspacios(){
    this.espaciosService.getEspacios(this.cod_org).subscribe(
          res =>{
            if(res.error == 0){
              this.listaEspacios=res.espacios;
            }
          },
          err =>{

          }
      );
  }

}
