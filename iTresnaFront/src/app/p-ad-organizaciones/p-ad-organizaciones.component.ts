import { Component, OnInit, Input } from '@angular/core';
import { Organizacion } from '../clases/Organizacion';
import { Router } from '@angular/router';
import { OrganizacionesService} from '../servicios/organizaciones.service';
import { UsuariosService} from '../servicios/usuarios.service';
import { Usuario, Permiso } from '../clases/usuario';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ModalAdminCopsComponent } from '../modal-admin-cops/modal-admin-cops.component';

@Component({
  selector: 'app-p-ad-organizaciones',
  templateUrl: './p-ad-organizaciones.component.html',
  styleUrls: ['./p-ad-organizaciones.component.css']
})
export class PAdOrganizacionesComponent implements OnInit {

  show:boolean=false;

  usuarioLogado:Usuario;
  listaOrgMostradas:Organizacion[]=[];
  listaOrganizacion:Organizacion[]=[];
  currentItem;
  seleccionFiltro:number=1;
  seleccionOrden:number=1;
  organizacion:Organizacion;
  constructor(
    private organizacionesService:OrganizacionesService,
    private router: Router,
    private dialog:MatDialog) 
    {

   }

  ngOnInit() {
    if(localStorage.getItem("usuario")!=null){
      this.usuarioLogado=JSON.parse(localStorage.getItem("usuario"));
      if(this.usuarioLogado.tip_usuario==1){
        this.router.navigateByUrl("Organizaciones");
      }else{
        this.router.navigateByUrl("Principal");
      }
    }
    
    if(localStorage.length>0){
      this.usuarioLogado=JSON.parse(localStorage.getItem("usuario"));
      this.cargarOrganizaciones();
 
    }else{
      this.router.navigateByUrl("");
    }
  }

  cargarOrganizaciones(){
    this.organizacionesService.getOrganizaciones()
        .subscribe(
          res =>{
            if(res.error == 0){
              this.listaOrganizacion=res.organizaciones;
              this.listaOrgMostradas=this.listaOrganizacion;
            }
            else{
              
            }
          }, 
          err =>{ 
            console.log(err);

          } 
      );
  }

  async administrar(item){
    if (this.currentItem === item) return;
    this.currentItem = item;
    this.usuarioLogado.cod_org=this.currentItem.cod_org;
    let string=await JSON.stringify(this.usuarioLogado);
    await localStorage.setItem("usuario",string);
    this.router.navigateByUrl("Administracion");
  }
  filtrarOrganizaciones(){
    this.show=this.seleccionFiltro!=1;
  }
  ordenarOrganizaciones(){
    switch(this.seleccionOrden){
      case 1:
        this.listaOrgMostradas=this.listaOrgMostradas.sort((a,b)=>{
          return a.desc_org.localeCompare(b.desc_org);
        });
        break;
      case 2:
          this.listaOrgMostradas=this.listaOrgMostradas.sort((a,b)=>{
            return a.desc_org.localeCompare(b.desc_org)*-1;
          });
        break;
        default:
          break;
    }
  }
  applyFilter(filter:string){
    switch(this.seleccionFiltro){
      case 2:
        this.listaOrgMostradas=this.listaOrganizacion.filter(x=>x.desc_org.indexOf(filter)!=-1);
        break;
      case 3:
        this.listaOrgMostradas=this.listaOrganizacion.filter(x=>x.contacto.indexOf(filter)!=-1);

    }
    this.ordenarOrganizaciones();
  }
  borrar(item:Organizacion){
    if(window.confirm("¿Esta seguro de querer eliminar la organizacion?")){
      if(window.confirm("Esta acción no tiene vuelta atras,¿Seguro que desea eliminarlo?")){
        this.organizacionesService.eliminarOrganizacion(item.cod_org).subscribe(
          response=>{
            if(response.error==0){
              location.reload();
            }else{
              console.error("No se ha podido eliminar la organización.");
            }
          },
          error=>{
            console.log(error);
          }
        );
      }
    }
  }

  nueva(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.minWidth="50%";
    dialogConfig.data=[
      {
        input:"inputField",
        controlName:"nombre",
        placeHolder:"Escribe el nombre de la org",
        data:{
          desc:""
        }
      },
      {
        input:"inputField",
        controlName:"descripcion",
        placeHolder:"Escribe la descripcion de la org",
        data:{
          desc:""
        }
      },
      {
        input:"fileField",
        controlName:"imagen",
        placeHolder:"Selecciona un archivo",
        data:{
          desc:""
        }
      },
      {
        input:"inputField",
        controlName:"enlace",
        placeHolder:"Escribe en enlace a la org",
        data:{
          desc:""
        }
      }
    ];
    const dialogRef=this.dialog.open(ModalAdminCopsComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(
      data=>{
        if(data!=null){
          var file="";
          if(data.imagen!=null){
            var reader = new FileReader();
            reader.readAsDataURL(data.imagen);
            reader.onload = () =>{
              this.nuevaOrgnizacion(data.nombre,
                data.descripcion,
                data.enlace,
                reader.result.toString().split(',')[1]);              
            };
            
          }else{
            this.nuevaOrgnizacion(data.nombre,data.descripcion,data.enlace,"");
          }
        }
      }
    );
  }
  private nuevaOrgnizacion(nombre:string,descripcion:string,enlace:string,imagen:string){
    this.organizacionesService.nuevaOrgnizacion(nombre,descripcion,enlace,imagen).subscribe(
      response=>{
        if(response.error==0){
          location.reload();
        }else{
          console.error("Hubo un error al crear la organización.");
        }
      }
    );
  }

  editar(item:Organizacion){
    this.organizacionesService.getOrganizacionActual(item.cod_org).subscribe(
      response=>{
        let usuarios:any[]=[];
        for(var i=0;i<response.organizacion.usuarios.length;i++){
          usuarios.push({"id":i,"desc":response.organizacion.usuarios[i]});
        }
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus=true;
        dialogConfig.minWidth="50%";
        dialogConfig.data=[
          {
            input:"inputField",
            controlName:"nombre",
            placeHolder:"Escribe el nombre de la org",
            data:{
              desc:item.desc_org
            }
          },
          {
            input:"inputField",
            controlName:"descripcion",
            placeHolder:"Escribe la descripcion de la org",
            data:{
              desc:item.eslogan_org
            }
          },
          {
            input:"fileField",
            controlName:"imagen",
            placeHolder:"Selecciona un archivo",
            data:{
              desc:""
            }
          },
          {
            input:"inputField",
            controlName:"enlace",
            placeHolder:"Escribe en enlace a la org",
            data:{
              desc:item.enlace_org
            }
          },
          {
            input:"selectField",
            controlName:"contacto",
            placeHolder:"Selecciona un contacto",
            data:usuarios
          }
        ];
        const dialogRef=this.dialog.open(ModalAdminCopsComponent,dialogConfig);
        dialogRef.afterClosed().subscribe(
          data=>{
            if(data!=null){
            let contacto=usuarios[data.contacto];
              var file="";
              if(data.imagen!=null){
                var reader = new FileReader();
                reader.readAsDataURL(data.imagen);
                reader.onload = () =>{
                  this.modificar(item.cod_org,data.nombre,
                    data.descripcion,
                    contacto.desc,
                    data.enlace,
                    reader.result.toString().split(',')[1]);              
                };
                
              }else{
                this.modificar(item.cod_org,data.nombre,data.descripcion,contacto.desc,data.enlace,"");
              }
            }
          }
        );
      }
    );
  }
  private modificar(cod_org:number,desc_org:string,eslogan:string,contacto:string,enlace:string,imagen:string){
    this.organizacionesService.modificarOrganizacion(cod_org,desc_org,eslogan,contacto,enlace,imagen).subscribe(
      response=>{
        console.log(response);
        if(response.error==0){
          location.reload();
        }
      },
      error=>{
        console.log(error);
      }
    );
  }

  filtroSeleccionado():String{
    if (this.seleccionFiltro==1){
      return "Ninguno";
    }else if (this.seleccionFiltro==2){
      return "Contacto";
    }
    else if(this.seleccionFiltro==3){
      return "Organizacion";
    }
  }
}
