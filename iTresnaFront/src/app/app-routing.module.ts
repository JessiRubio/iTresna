import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PEspaciosComponent} from './p-espacios/p-espacios.component';
import {PCopsComponent} from './p-cops/p-cops.component'
import { UsuariosService } from './servicios/usuarios.service';
import { PAdministracionComponent } from './p-administracion/p-administracion.component';
import { PAdOrganizacionesComponent } from './p-ad-organizaciones/p-ad-organizaciones.component';
import { PPerfilComponent } from './p-perfil/p-perfil/p-perfil.component';
import { PRecuperarContrasenaComponent } from './p-recuperar-contrasena/p-recuperar-contrasena.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'Principal',
    component: PEspaciosComponent
  },
  {
    path: 'Cops',
    component: PCopsComponent
  },
  {
    path: 'Administracion',
    component:PAdministracionComponent
  },
  {
    path: 'Organizaciones',
    component:PAdOrganizacionesComponent
  },
  {
    path: 'Perfil',
    component:PPerfilComponent
  },
  {
    path:'RecuperarContraseña',
    component:PRecuperarContrasenaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router:Router,private usuarioService:UsuariosService){
    this.usuarioService.logged().subscribe(
      res=>{
        if(!res){
          this.router.navigateByUrl("");
        }
      }
    );
  }
  
}
