import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PEspaciosComponent } from './p-espacios/p-espacios.component';
import { PCopsComponent } from './p-cops/p-cops.component';
import { MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatRippleModule, MatSelectModule, MatMenuModule, MAT_DIALOG_DEFAULT_OPTIONS, MatCheckbox, MatCheckboxModule} from "@angular/material";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SenalesComponent } from './p-cops/senales/senales.component';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosService } from './servicios/usuarios.service';
import { EspaciosService } from './servicios/espacios.service';
import { SenalesService} from './servicios/senales.service';
import { MenuOverflowComponent } from './menu-overflow/menu-overflow.component';
import { HeaderGenericoComponent } from './header-generico/header-generico.component';
import { ModalSenalComponent } from './p-cops/modalsenal/modalsenal.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatLinkPreviewModule } from '@angular-material-extensions/link-preview';
import { PAdOrganizacionesComponent } from './p-ad-organizaciones/p-ad-organizaciones.component';
import { OrganizacionComponent } from './p-administracion/organizacion/organizacion.component';
import { EspaciosComponent } from './p-administracion/espacios/espacios.component';
import { UsuariosComponent } from './p-administracion/usuarios/usuarios.component';
import { PAdministracionComponent } from './p-administracion/p-administracion.component';
import { CopComponent } from './p-espacios/cops/cop.component';
import { AdminCopsComponent } from './p-administracion/admin-cops/admin-cops.component';
import { MatTableModule} from '@angular/material/table';
import { SelectFieldComponent } from './modal-admin-cops/select-field/select-field.component';
import { InputFieldComponent } from './modal-admin-cops/input-field/input-field.component';
import { FileFieldComponent } from './modal-admin-cops/file-field/file-field.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { CheckboxFieldComponent } from './modal-admin-cops/checkbox-field/checkbox-field.component';
import { NumberFieldComponent } from './modal-admin-cops/number-field/number-field.component';
import { DatosCalificatoriosComponent } from './p-administracion/datos-calificatorios/datos-calificatorios.component';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertGenericoComponent } from './alert-generico/alert-generico.component';
import { PCuracionComponent } from './p-curacion/p-curacion.component';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { DragDropListComponent } from './p-curacion/drag-drop-list/drag-drop-list.component';
import { PPerfilComponent } from './p-perfil/p-perfil/p-perfil.component';
import { PasswordFieldComponent } from './modal-admin-cops/password-field/password-field/password-field.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PObjetoCuracionComponent } from './p-curacion/drag-drop-list/p-objeto-curacion/p-objeto-curacion.component';
import { ModalGenericoComponent } from './modal-generico/modal-generico.component';
import { TextInputComponent } from './modal-generico/text-input/text-input.component';
import { PasswordInputComponent } from './modal-generico/password-input/password-input.component';
import { FileInputComponent } from './modal-generico/file-input/file-input.component';
import { CheckboxInputComponent } from './modal-generico/checkbox-input/checkbox-input.component';
import { NumberInputComponent } from './modal-generico/number-input/number-input.component';
import { SelectInputComponent } from './modal-generico/select-input/select-input.component';
import { GestionUsuariosComponent } from './p-administracion/usuarios/gestion-usuarios/gestion-usuarios.component';
import { ComentariosComponent } from './p-cops/comentarios/comentarios.component';
import { PermisosComponent } from './p-administracion/usuarios/permisos/permisos/permisos.component';
import { PRecuperarContrasenaComponent } from './p-recuperar-contrasena/p-recuperar-contrasena.component';

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
    SelectFieldComponent,
    InputFieldComponent,
    FileFieldComponent,
    CheckboxFieldComponent,
    NumberFieldComponent,
    DatosCalificatoriosComponent,
    AlertGenericoComponent,
    PCuracionComponent,
    DragDropListComponent,
    PPerfilComponent,
    PasswordFieldComponent,
    PObjetoCuracionComponent,
    ModalGenericoComponent,
    TextInputComponent,
    PasswordInputComponent,
    FileInputComponent,
    CheckboxInputComponent,
    NumberInputComponent,
    SelectInputComponent,
    GestionUsuariosComponent,
    ComentariosComponent,
    PermisosComponent,
    PRecuperarContrasenaComponent
    
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
    MatCheckboxModule,
    NgbModule,
    DragDropModule,
    FontAwesomeModule,
  ],
  providers: [UsuariosService,EspaciosService,SenalesService,PCuracionComponent],
  bootstrap: [AppComponent],
  entryComponents:[
    ModalSenalComponent,
    SelectFieldComponent,
    InputFieldComponent,
    CheckboxFieldComponent,
    AlertGenericoComponent,
    ModalGenericoComponent,
    ComentariosComponent
  ]
})
export class AppModule { 
}
