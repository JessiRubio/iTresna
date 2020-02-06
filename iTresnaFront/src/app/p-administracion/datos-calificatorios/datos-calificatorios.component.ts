import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrganizacionesService } from '../../servicios/organizaciones.service';
import { Organizacion, Categorias } from '../../clases/organizacion';
import { Usuario } from '../../clases/usuario';
import { ClasificacionService } from '../../servicios/clasificacion.service';

@Component({
  selector: 'app-datos-calificatorios',
  templateUrl: './datos-calificatorios.component.html',
  styleUrls: ['./datos-calificatorios.component.css']
})
export class DatosCalificatoriosComponent implements OnInit{

  private form:FormGroup;
  private organizacion: Organizacion;
  private usuarioLogeado: Usuario;

  private datosprevios:Boolean;
  private editarClasificacion:Boolean;

  private listaClasif:string[];

  private listaClasif1:string[];
  private listaClasif2:string[];
  private listaClasif3:string[];

  private listaCargada:number =0;


  constructor(private fBuilder: FormBuilder,
    private organizacionesService: OrganizacionesService,
    private clasificacionService: ClasificacionService) 
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
    this.organizacionesService.getOrganizacionActual(this.usuarioLogeado.cod_org).subscribe(
      res=>{
        this.organizacion=res.organizacion;
        this.form.controls["clasif1"].setValue(this.organizacion.clasif1,Validators.required);
        this.form.controls["clasif2"].setValue(this.organizacion.clasif2,Validators.required);
        this.form.controls["clasif3"].setValue(this.organizacion.clasif3,Validators.required); 
        this.cargarlistas();
      }
    );
    
  }

  editar(num:number){
      this.editarClasificacion = true;
      this.datosprevios = false;

      if (num == 1){
        this.listaClasif = this.listaClasif1;
        this.listaCargasda = 1;
      }
      else if(num == 2){
        this.listaClasif = this.listaClasif2;
        this.listaCargasda = 2;
      } 
      else if (num == 3){
        this.listaClasif = this.listaClasif3;
        this.listaCargasda = 3;
      }
    
  }

  guardarCambios(){
    this.form.disable();
    this.organizacion.clasif1 = this.form.controls["clasif1"].value;
    this.organizacion.clasif2 = this.form.controls["clasif2"].value;
    this.organizacion.clasif3 = this.form.controls["clasif3"].value;

    this.organizacionesService.actualizarCamposClasifOrg(this.organizacion).subscribe(
      res=>{
        console.log(res)
      },
      err=>{
        console.log(err);
      }
      
    );
  }

  cargarlistas(){
    this.listaClasif1 = [];
    this.listaClasif2 = [];
    this.listaClasif3 = [];
    for(var pos=0;pos<this.organizacion.categorias.length;pos++){
      if (this.organizacion.categorias[pos].tip_clasificacion === this.organizacion.clasif1){
        this.listaClasif1.push(this.organizacion.categorias[pos].categoria);
      }else if(this.organizacion.categorias[pos].tip_clasificacion === this.organizacion.clasif2){
        this.listaClasif2.push(this.organizacion.categorias[pos].categoria);
      }else if(this.organizacion.categorias[pos].tip_clasificacion === this.organizacion.clasif3){
        this.listaClasif3.push(this.organizacion.categorias[pos].categoria);
      }
    }


  }

  atrasClasificacion(){
    this.editarClasificacion = false;
    this.datosprevios = true;
  }

  borrarCampo(categoria:string){
    if(window.confirm("¿Estas seguro de eliminar el espacio seleccionado?")){
      this.clasificacionService.deleteCategoria(this.organizacion.cod_org,this.listaCargada, categoria).subscribe(
        respose=>{
          console.log(respose);
          if(respose.error==0){
            location.reload();
          }
        }
      )
    }
    
  }
}
