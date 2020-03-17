import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrganizacionesService } from '../../servicios/organizaciones.service';
import { Organizacion } from '../../clases/organizacion';
import { Usuario } from '../../clases/usuario';
import { ClasificacionService } from '../../servicios/clasificacion.service';
import { MatDialog } from '@angular/material';
import {ModalServiceService}from '../../servicios/modal-service.service';
import { Observable } from 'rxjs';
import { Alerta } from '../../clases/alerta';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertGenericoComponent } from '../../alert-generico/alert-generico.component';
@Component({
  selector: 'app-datos-calificatorios',
  templateUrl: './datos-calificatorios.component.html',
  styleUrls: ['./datos-calificatorios.component.css']
})
export class DatosCalificatoriosComponent implements OnInit{

  form:FormGroup;
  private organizacion: Organizacion;
  private usuarioLogeado: Usuario;

  datosprevios:Boolean;
  editarClasificacion:Boolean;
  selected:string
  listaClasif:string[];

  listaClasif1:string[] = [];
  listaClasif2:string[] = [];
  listaClasif3:string[] = [];

  private listaCargada:number =0;


  constructor(private fBuilder: FormBuilder,
    private organizacionesService: OrganizacionesService,
    private clasificacionService: ClasificacionService,
    private dialog:MatDialog,
    private modalServiceAlert:NgbModal,  
    private modalService:ModalServiceService,
    private cd:ChangeDetectorRef) 
    {
      this.form=this.fBuilder.group({
        clasif1:["",Validators.required],
        clasif2:["",Validators.required],
        clasif3:["",Validators.required],
      });
      this.usuarioLogeado=JSON.parse(localStorage.getItem("usuario"));
      this.datosprevios = true;
      this.editarClasificacion = false;
      
   }

  ngOnInit() {
    this.cargarOrg();
    
  }

  cargarOrg(){
    var observable:Observable<any>=this.organizacionesService.getOrganizacionActual(this.usuarioLogeado.cod_org);
    observable.subscribe(
      res=>{
        this.organizacion=res.organizacion;
        this.form.controls["clasif1"].setValue(this.organizacion.clasificacion[0].clasificacion,Validators.required);
        if(this.organizacion.clasificacion.length>1){
          this.form.controls["clasif2"].setValue(this.organizacion.clasificacion[1].clasificacion,Validators.required);
        }
        if (this.organizacion.clasificacion.length>2){
          this.form.controls["clasif3"].setValue(this.organizacion.clasificacion[2].clasificacion,Validators.required);
        }
        this.cargarlistas();
      }
    );
    return observable.toPromise();
    
  }

  editar(num:number){
      this.editarClasificacion = true;
      this.datosprevios = false;

      if (num == 1){
       this.listaClasif = this.listaClasif1;
        this.listaCargada = 0;
      }
      else if(num == 2){
        this.listaClasif = this.listaClasif2;
        this.listaCargada = 1;
      } 
      else if (num == 3){
        this.listaClasif = this.listaClasif3;
        this.listaCargada = 2;
      }
    
  }

  guardarCambios(clasificacion:number){
    var clasifAntiguo=this.organizacion.clasificacion[clasificacion - 1].clasificacion;
    
    var clasifNuevo = this.form.controls["clasif"+clasificacion].value;
    this.clasificacionService.actualizarClasifOrg(this.organizacion.cod_org,clasifAntiguo,clasifNuevo).subscribe(
      res=>{
        console.log(res)
      },
      err=>{
        console.log(err);
      }
      
    );
  }

  editarCampo(campoAntiguo:string){
    var clasificacion=this.organizacion.clasificacion[this.listaCargada].clasificacion;
    this.abrirModal(campoAntiguo,"Modificar Campo","Modificar").then(
      data=>{
        if(data!=null){
          this.clasificacionService.modificarCategoria(this.organizacion.cod_org, clasificacion,campoAntiguo, data.campo).subscribe(
            async respose=>{
              if(respose.error==0){
                await this.cargarOrg();
                this.editar(this.listaCargada);
                this.cd.detectChanges();
                console.log(this.organizacion.clasificacion[this.listaCargada].categorias);
              }
            },
            error=>{
              console.log(error.error);
            }
          );
        }
      },
      error=>{
        //TODO nos da igual el cierre del modal
      }
    );
  }

  anadircampo(){
    var clasificacion = this.organizacion.clasificacion[this.listaCargada].clasificacion;
    var campo = "";
    this.abrirModal(campo,"Alta Campo","Alta").then(
      data=>{
        if(data!=null){
          this.clasificacionService.anadirCategoria(this.organizacion.cod_org,clasificacion, data.campo).subscribe(
            async respose=>{
              if(respose.error==0){
                let alert:Alerta = {
                  message:"Categoria añadida correctamente, redirigiendo", 
                  type:'success'
                };
                this.abrirAlerta(alert);
                await this.cargarOrg();
                this.editar(this.listaCargada);
              }
            },
            error=>{
              //TODO ALERT
            }
          );
        }
      },
      error=>{
        //Nos da igual el cierre del modal
      }
    );
  }
  
  abrirAlerta(alerta:Alerta){
    let modalRef:NgbModalRef;
    modalRef=this.modalServiceAlert.open(AlertGenericoComponent, {centered:true});
    (<AlertGenericoComponent>modalRef.componentInstance).alert=alerta;
  }

  private abrirModal(campo:string,titulo:string,botonFin:string):Promise<any>{
    var data=[
      {
        input:"inputField",
        controlName:"campo",
        placeHolder:"Escribe el nombre del campo",
        data:campo,
      }
    ];
    var config={
      data:data,
      titulo:titulo,
      botonFin:botonFin
    };
    return this.modalService.abrirModal(config);
  }

  cargarlistas(){
    this.listaClasif1 = this.organizacion.clasificacion[0].categorias;
    this.listaClasif2 = this.organizacion.clasificacion[1].categorias;
    this.listaClasif3 = this.organizacion.clasificacion[2].categorias;
  }

  atrasClasificacion(){
    this.editarClasificacion = false;
    this.datosprevios = true;
  }

  borrarCampo(categoria:string){
    var clasificacion = this.organizacion.clasificacion[this.listaCargada].clasificacion;
    if(window.confirm("¿Estas seguro de eliminar el espacio seleccionado?")){
      this.clasificacionService.deleteCategoria(this.organizacion.cod_org,clasificacion, categoria).subscribe(
        respose=>{
          if(respose.error==0){
            let alert:Alerta = {
              message:"Categoria eliminada correctamente, redirigiendo", 
              type:'success'
            };
            this.abrirAlerta(alert);
            location.reload();
          }
        }
      )
    }
    
  }
}
