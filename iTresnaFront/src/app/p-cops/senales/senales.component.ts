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
import { Alerta } from '../../clases/alerta';
import { AlertService } from '../../servicios/alert.service';


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
  permisosShow:boolean=false;
  
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
    private modalService:ModalServiceService,
    private alertService:AlertService
    ) {
   }

  ngOnInit() {
    this.usuarioLogeado=JSON.parse(localStorage.getItem("usuario"));
    this.route.queryParams.subscribe(params => {
      this.cod_cop = params['copSeleccionado'];
      this.cod_esp = params['codEspacio'];

    });
    this.cargarComentarios();
    this.tienePermisos();
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

  tienePermisos(){
    if(this.usuarioLogeado.cod_usuario===this.senal.cod_usuario){
      this.permisosShow=true;
    }else if(this.usuarioLogeado.tip_usuario==1){
      this.permisosShow=true;
    }
    else{
      for(var i=0;i<this.usuarioLogeado.permisos.length;i++){
        if(this.usuarioLogeado.permisos[i].cod_cop==this.cod_cop && this.usuarioLogeado.permisos[i].ind_admin===true){
          this.permisosShow=true;
          break;
        }
      }
    } 
  }

  editar(){
    this.abrirModal(this.senal,"Modificar Señal","Modificar", "Cancelar").then(
      data=>{
        if(data!=null){
          this.senal.enlace=data.enlace;
          this.senal.desc_senal=data.descripcion;
          this.senal.desc_etiqueta=data.etiqueta;
          this.senal.cod_etiqueta=this.etiquetas.find(x=>x.desc_etiqueta==data.etiqueta).cod_etiqueta;
          this.senalesService.modificarSenal(this.senal).subscribe(
            response=>{
              var alert:Alerta;
              if(response.error!=0){
                alert = {
                  message:"Señal modificada correctamente.", 
                  type:'success'
                };
              }
              else{
                alert = {
                  message:"No se ha podido añadir la señal.", 
                  type:'warning'
                };
              }
              this.alertService.abrirAlerta(alert);
            },
            error=>{
              let alert:Alerta = {
                message:"Error con el servidor",
                type:'danger'
              };
              this.alertService.abrirAlerta(alert);
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

    this.abrirModalEliminar("Eliminar señal","¿Desea eliminar la señal?","Si", "No").then(
      data=>{
        this.senalesService.deleteSenal(this.senal).subscribe(
          response =>{
            var alert:Alerta;
            if (response.error == 1){
              alert = {
                message:"No se ha podido añadir la señal.", 
                type:'warning'
              };
            }
            else{
              alert = {
                message:"Señal modificada correctamente.", 
                type:'success'
              };
              location.reload();
            }
            this.alertService.abrirAlerta(alert);
          },
          error =>{
            let alert:Alerta = {
              message:"Error con el servidor",
              type:'danger'
            };
            this.alertService.abrirAlerta(alert);
          }
        );
        location.reload();
      },
        error=>{
          //Nos da igual que no se cierre correctamente     
        }
    );   
  }

  abrirModalEliminar(titulo:string,label:string,botonFin:string, botonCancel:string):Promise<any>{
    var data=[
      
    ];
    var config={
      data:data,
      label:label,
      botonFin:botonFin,
      botonCancel:botonCancel,
      titulo:titulo
    };
    return this.modalService.abrirModalTexto(config);
  }
  
  mostrarEnvioComentarios(){
    this.mostrarEnvio=!this.mostrarEnvio
  }

  mostrarSenalCompleta(){
    this.acortado=!this.acortado;
  }
  private abrirModal(senal:SenalesItem, titulo:string,botonFin:string, botonCancel:string){
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
      botonCancel:botonCancel,
      titulo:titulo
    }
    return this.modalService.abrirModal(config);
  }
}


