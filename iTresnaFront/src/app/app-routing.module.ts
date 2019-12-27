import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PEspaciosComponent} from './p-espacios/p-espacios.component';
import {PCopsComponent} from './p-cops/p-cops.component'
import { UsuariosService } from './servicios/usuarios.service';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
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
