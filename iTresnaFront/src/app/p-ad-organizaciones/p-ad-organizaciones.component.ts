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
  listaOrganizacion:Organizacion[]=[];
  currentItem;
  selected=0;
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
            }
            else{
              
            }
          }, 
          err =>{ 
            console.log(err);

          } 
      );
  }

  async setItem(item){
    if (this.currentItem === item) return;
    this.currentItem = item;
    this.usuarioLogado.cod_org=this.currentItem.cod_org;
    let string=await JSON.stringify(this.usuarioLogado);
    await localStorage.setItem("usuario",string);
    this.router.navigateByUrl("Administracion");
  }
  
  cargarOrganizacionesOrdenadas(value:number){
    this.selected=value;
    if(this.selected == 2){
      this.show=true;
    }
    else{
      this.show=false;
    }
  }

  borrar(item:Organizacion){
    if(window.confirm("¿Esta seguro de querer eliminar la organizacion?")){
      if(window.confirm("Esta acción no tiene vuelta atras,¿Seguro que desea eliminarlo?")){
        this.organizacionesService.eliminarOrganizacion(item.cod_org).subscribe(
          response=>{
            console.log(response);
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
                reader.result.toString().split(',')[1]);              
            };
            
          }else{
            this.nuevaOrgnizacion(data.nombre,data.descripcion,"");
          }
        }
      }
    );
  }
  private nuevaOrgnizacion(nombre:string,descripcion:string,imagen:string){
    this.organizacionesService.nuevaOrganizacion(nombre,descripcion,imagen).subscribe(
      response=>{
        if(response.error==0){
          location.reload();
        }else{
          console.error("Hubo un error al crear la organización.")
        }
      }
    );
  }
}
