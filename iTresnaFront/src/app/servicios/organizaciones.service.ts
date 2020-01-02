import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organizacion } from '../clases/organizacion';

@Injectable({
  providedIn: 'root'
})
export class OrganizacionesService {

  private url="http://localhost:8080/organizaciones/";

  constructor(private httpClient:HttpClient) { }

  getOrganizaciones():Observable<any>{
    return this.httpClient.get<any>(this.url);
  }

}
