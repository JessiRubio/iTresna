import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PEspaciosComponent } from './p-espacios/p-espacios.component';
import { CopsComponent } from './p-espacios/cops/cops.component';
import { PCopsComponent } from './p-cops/p-cops.component';

import { FormsModule } from '@angular/forms';
import { SenalesComponent } from './p-cops/senales/senales.component';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosService } from '../servicios/usuarios.service';
import { EspaciosService } from '../servicios/espacios.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PEspaciosComponent,
    CopsComponent,
    PCopsComponent,
    SenalesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    
    
  ],
  providers: [UsuariosService,EspaciosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
