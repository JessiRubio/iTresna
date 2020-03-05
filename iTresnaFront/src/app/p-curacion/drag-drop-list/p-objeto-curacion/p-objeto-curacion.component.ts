import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { SenalesService } from '../../../servicios/senales.service';
import { ComentariosService } from '../../../servicios/comentarios.service';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { MatDialog } from '@angular/material';
import { SenalesItem } from '../../../clases/senales-item';
import { EtiquetaItem } from '../../../clases/copsitem';
import { Usuario } from '../../../clases/usuario';

@Component({
  selector: 'app-p-objeto-curacion',
  templateUrl: './p-objeto-curacion.component.html',
  styleUrls: ['./p-objeto-curacion.component.css']
})
export class PObjetoCuracionComponent implements OnInit {

  private usuarioLogeado:Usuario;
  private cod_esp:number;
  private cod_cop:number;
  private admin:boolean=false;
  
  str: string;
  cod_coment:number=15;
  mostrarEnvio:boolean=false;
  
  @Input() senal:SenalesItem;

  acortado:boolean=true; 

  constructor(
    private http:HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private senalesService:SenalesService,
    private comentariosService:ComentariosService,
    private usuarioService:UsuariosService,
    private dialog:MatDialog
    ) {
   }

  ngOnInit() {
    this.usuarioLogeado=JSON.parse(localStorage.getItem("usuario"));
    this.route.queryParams.subscribe(params => {
      this.cod_cop = params['copSeleccionado'];
      this.cod_esp = params['codEspacio'];

    });
  }

}