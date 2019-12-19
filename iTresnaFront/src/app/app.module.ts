import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PEspaciosComponent } from './p-espacios/p-espacios.component';
import { CopsComponent } from './p-espacios/cops/cops.component';
import { PCopsComponent } from './p-cops/p-cops.component';
import { MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatRippleModule, MatSelectModule, MatMenuModule, MAT_DIALOG_DEFAULT_OPTIONS } from "@angular/material";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SenalesComponent } from './p-cops/senales/senales.component';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosService } from './servicios/usuarios.service';
import { EspaciosService } from './servicios/espacios.service';
import { SenalesService} from './servicios/senales.service';
import { MenuOverflowComponent } from './menu-overflow/menu-overflow.component';
import { HeaderGenericoComponent } from './header-generico/header-generico.component';
import { ModalSenalComponent } from './p-cops/modalsenal/modalsenal.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PEspaciosComponent,
    CopsComponent,
    PCopsComponent,
    SenalesComponent,
    MenuOverflowComponent,
    HeaderGenericoComponent,
    ModalSenalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  providers: [UsuariosService,EspaciosService,SenalesService],
  bootstrap: [AppComponent],
  entryComponents:[ModalSenalComponent]
})
export class AppModule { }
