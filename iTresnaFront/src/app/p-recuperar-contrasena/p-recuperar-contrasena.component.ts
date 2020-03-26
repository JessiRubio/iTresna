import { Component, OnInit } from '@angular/core';
import { EmailService } from '../servicios/email.service';

@Component({
  selector: 'app-p-recuperar-contrasena',
  templateUrl: './p-recuperar-contrasena.component.html',
  styleUrls: ['./p-recuperar-contrasena.component.css']
})
export class PRecuperarContrasenaComponent implements OnInit {

  userEmail:string;
  show:boolean=false;

  constructor(private emailService:EmailService) { 
    this.userEmail = "";
  }

  ngOnInit() {
  }

  enviarEmail(){
    this.emailService.sendEmail(this.userEmail).subscribe(
      res=>{
        //console.log(res);
        if(res==="success"){
          this.show=true;
        }
      },
      err=>{
        //console.log(err);
      }
    )
  }
}
