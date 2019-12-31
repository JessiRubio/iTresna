import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PEspaciosComponent } from './p-espacios/p-espacios.component';
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
import { MatLinkPreviewModule } from '@angular-material-extensions/link-preview';
import { PAdOrganizacionesComponent } from './p-ad-organizaciones/p-ad-organizaciones.component';
import { OrganizacionComponent } from './p-administracion/organizacion/organizacion.component';
import { EspaciosComponent } from './p-administracion/espacios/espacios.component';
import { UsuariosComponent } from './p-administracion/usuarios/usuarios.component';
import { PAdministracionComponent } from './p-administracion/p-administracion.component';
import { CopComponent } from './p-espacios/cops/cop.component';
import { AdminCopsComponent } from './p-administracion/admin-cops/admin-cops.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PEspaciosComponent,
    CopComponent,
    PCopsComponent,
    SenalesComponent,
    MenuOverflowComponent,
    HeaderGenericoComponent,
    ModalSenalComponent,
    PAdOrganizacionesComponent,
    PAdministracionComponent,
    OrganizacionComponent,
    EspaciosComponent,
    UsuariosComponent,
    AdminCopsComponent
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
    MatSelectModule,
    MatLinkPreviewModule.forRoot()
  ],
  providers: [UsuariosService,EspaciosService,SenalesService],
  bootstrap: [AppComponent],
  entryComponents:[ModalSenalComponent]
})
export class AppModule { }
