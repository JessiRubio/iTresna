import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Inject, ComponentFactoryResolver } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PEspaciosComponent } from './p-espacios/p-espacios.component';
import { PCopsComponent } from './p-cops/p-cops.component';
import { MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatRippleModule, MatSelectModule, MatMenuModule, MAT_DIALOG_DEFAULT_OPTIONS, MatCheckbox, MatCheckboxModule } from "@angular/material";

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
import {MatTableModule} from '@angular/material/table';
import { ModalAdminCopsComponent } from './modal-admin-cops/modal-admin-cops.component';
import { SelectFieldComponent } from './modal-admin-cops/select-field/select-field.component';
import { InputFieldComponent } from './modal-admin-cops/input-field/input-field.component';
import { FileFieldComponent } from './modal-admin-cops/file-field/file-field.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { CheckboxFieldComponent } from './modal-admin-cops/checkbox-field/checkbox-field.component';
import { NumberFieldComponent } from './modal-admin-cops/number-field/number-field.component';

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
    AdminCopsComponent,
    ModalAdminCopsComponent,
    SelectFieldComponent,
    InputFieldComponent,
    FileFieldComponent,
    CheckboxFieldComponent,
    NumberFieldComponent
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
    MatLinkPreviewModule.forRoot(),
    MatTableModule,
    MaterialFileInputModule,
    MatCheckboxModule

  ],
  providers: [UsuariosService,EspaciosService,SenalesService],
  bootstrap: [AppComponent],
  entryComponents:[ModalSenalComponent,ModalAdminCopsComponent,SelectFieldComponent,InputFieldComponent,CheckboxFieldComponent]
})
export class AppModule { 
}
