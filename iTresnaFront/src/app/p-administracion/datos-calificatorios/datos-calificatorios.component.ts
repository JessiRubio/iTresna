import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrganizacionesService } from '../../servicios/organizaciones.service';
import { Organizacion } from '../../clases/organizacion';
import { Usuario } from '../../clases/usuario';

@Component({
  selector: 'app-datos-calificatorios',
  templateUrl: './datos-calificatorios.component.html',
  styleUrls: ['./datos-calificatorios.component.css']
})
export class DatosCalificatoriosComponent implements OnInit {

  private form:FormGroup;
  private organizacion: Organizacion;
  private usuarioLogeado: Usuario;

  editando:boolean;

  constructor(private fBuilder: FormBuilder,
    private organizacionesService: OrganizacionesService) 
    {
      this.form=this.fBuilder.group({
        clasif1:["",Validators.required],
        clasif2:["",Validators.required],
        clasif3:["",Validators.required],
      });
      this.usuarioLogeado=JSON.parse(localStorage.getItem("usuario"));
      this.editando = false;
   }

  ngOnInit() {
    this.cargarOrg();
  }

  cargarOrg(){
    this.organizacionesService.getOrganizacionActual(this.usuarioLogeado.cod_org).subscribe(
      response=>{
        this.organizacion=response.organizacion;
        this.form=this.fBuilder.group({
          clasif1:[this.organizacion.clasif1,Validators.required],
          clasif2:[this.organizacion.clasif2,Validators.required],
          clasif3:[this.organizacion.clasif3,Validators.required],
        });
      }
    );
  }

  editar(){
    this.editando = true;
  }

  guardarCambios(){
    this.editando = false;
  }
}
