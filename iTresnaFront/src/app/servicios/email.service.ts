import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as data from '../server-config.json';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private url=data.domain+"/email/";
  constructor(
    private httpClient:HttpClient
  ) {
  
  } 

  sendEmail(userEmail:string):Observable<any>{
    return this.httpClient.post(this.url,userEmail);
  }
}
