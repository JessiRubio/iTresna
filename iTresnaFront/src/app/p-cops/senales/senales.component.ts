import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SenalesItem } from '../../clases/senales-item';
import { Usuario } from  './../../clases/usuario';
import { SenalesService } from '../../servicios/senales.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EtiquetaItem } from '../../clases/copsitem';
import { Comentario } from '../../clases/comentario';
import { HttpClient } from '@angular/common/http';
import { ComentariosService } from './../../servicios/comentarios.service';
import {UsuariosService} from './../../servicios/usuarios.service';
import { ModalServiceService } from '../../servicios/modal-service.service';


@Component({
  selector: 'app-senales',
  templateUrl: './senales.component.html',
  styleUrls: ['./senales.component.css']
})
export class SenalesComponent implements OnInit {

  private usuarioLogeado:Usuario;
  private cod_esp:number;
  private cod_cop:number;
  private admin:boolean=false;
  
  str: string;
  cod_coment:number=15;
  mostrarEnvio:boolean=false;
  
  @Input() senal:SenalesItem;
  @Input() comentario:Comentario;
  @Input() etiquetas:EtiquetaItem[];

  listaComentarios:Comentario[]=[];
  acortado:boolean=true; 

  constructor(
    private http:HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private senalesService:SenalesService,
    private comentariosService:ComentariosService,
    private usuarioService:UsuariosService,
    private dialog:MatDialog,
    private modalService:ModalServiceService
    ) {
   }

  ngOnInit() {
    this.usuarioLogeado=JSON.parse(localStorage.getItem("usuario"));
    this.route.queryParams.subscribe(params => {
      this.cod_cop = params['copSeleccionado'];
      this.cod_esp = params['codEspacio'];

    });
    this.cargarComentarios();
  }

  cargarComentarios(){
    this.comentariosService.getComentarios(this.senal.cod_senal)
        .subscribe(
          res =>{
            if(res.error == 0){
              this.listaComentarios=res.comentarios;
            }
          }, 
          err =>{ 
            console.log(err);

          } 
      );
  }


  buscarEtiqueta():string{
    try{
      return this.etiquetas.find(x=>x.cod_etiqueta==this.senal.cod_etiqueta).desc_etiqueta;
    }catch(exception){
      return "";
    }
  }
  
  like(){
    var codUser=this.usuarioLogeado.cod_usuario;
    this.senalesService.like(codUser,this.senal.cod_org,this.senal.cod_esp,this.senal.cod_cop,this.senal.cod_senal).subscribe(
      res=>{
        console.log(res);
        if(res.error==0){
          if(res.aniadido==1){
            this.senal.me_ha_gustado=true;
            this.senal.me_gustas+=1;
          }else{
            this.senal.me_ha_gustado=true;
            this.senal.me_gustas-=1;
          }
        }
      }
    );
  }
    
  nuevoComentario(){
    if(this.str!==""){
      this.comentariosService.nuevoComentario(this.cod_coment,this.senal.cod_senal,this.senal.cod_cop,this.senal.cod_esp,this.senal.cod_org,this.usuarioLogeado.cod_usuario,this.str).subscribe(
        res=>{
          if(res.error==0){
            if(res.aniadido==1){
              location.reload();
            }else{
              
            }
          }
        }
      );
    }
    this.mostrarEnvioComentarios();
  }

  puedeEditar():boolean{
    if(this.usuarioLogeado.cod_usuario==this.senal.cod_usuario||this.usuarioLogeado.tip_usuario<=2){
      return true;
    }else{
      var permisos=this.usuarioLogeado.permisos.filter(x=>x.cod_esp===this.cod_esp && x.cod_cop===this.cod_cop);
      if(permisos.length>0){
        return permisos[0].ind_admin;
      }
      return false;
    }
  }

  puedeBorrar():boolean{
    if(this.usuarioLogeado.cod_usuario==this.senal.cod_usuario 
      || this.usuarioLogeado.tip_usuario<=2){
      return true;
    }else{
      var permisos=this.usuarioLogeado.permisos.filter(x=>x.cod_esp===this.cod_esp && x.cod_cop===this.cod_cop);
      if(permisos.length>0){
        return permisos[0].ind_admin;
      }
      return false;
    }
  }

  editar(){
    this.abrirModal(this.senal,"Modificar Señal","Modificar").then(
      data=>{
        if(data!=null){
          this.senal.enlace=data.enlace;
          this.senal.desc_senal=data.descripcion;
          this.senal.desc_etiqueta=data.etiqueta;
          this.senal.cod_etiqueta=this.etiquetas.find(x=>x.desc_etiqueta==data.etiqueta).cod_etiqueta;
          this.senalesService.modificarSenal(this.senal).subscribe(
            response=>{
              if(response.error!=0){
                window.alert("No se ha podido modificar la senñal");
              }
              else{
                window.alert("Señal modificada correctamente");
              }
            },
            error=>{
              console.error(error);
              window.alert("Error de conexion o fallo en servidor");
            }
          );
        }
      }
    );
  }

  comentarios(){
    this.modalService.abrirModalComentarios(this.listaComentarios);
  }

  borrar(){
    this.senalesService.deleteSenal(this.senal).subscribe(
      response =>{
        if (response.error ==1){
        }else{
          location.reload();
        }
      },
      error =>{
        window.alert("Error de conexion o fallo en servidor");
      }
    );
  }
  
  mostrarEnvioComentarios(){
    this.mostrarEnvio=!this.mostrarEnvio
  }

  mostrarSenalCompleta(){
    this.acortado=!this.acortado;
  }
  private abrirModal(senal:SenalesItem, titulo:string,botonFin:string){
    var etiquetas:string[]=[];
    this.etiquetas.forEach(etiqueta=>etiquetas.push(etiqueta.desc_etiqueta));
    var data=[
      {
        input:"inputField",
        controlName:"enlace",
        placeHolder:"Escribe el nombre de la org",
        data:senal.enlace
      },
      {
        input:"inputField",
        controlName:"descripcion",
        placeHolder:"Escribe el nombre de la org",
        data:senal.desc_senal
      },
      {
        input:"selectField",
        controlName:"etiqueta",
        placeHolder:"Escribe el nombre de la org",
        data:{
          data:etiquetas,
          seleccionado:senal.desc_etiqueta
        }
      }
    ];
    var config={
      data:data,
      botonFin:botonFin,
      titulo:titulo
    }
    return this.modalService.abrirModal(config);
  }
}


