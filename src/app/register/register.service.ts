import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })

  export class RegisterService{
    constructor(private http : HttpClient) { }

    public saveAdmin(value : any){
      return this.http.post<any>(`${environment.baseUrl}/saveAdmin`, value, {observe : 'response'});
    }
  
    public saveUser(value : any){
      return this.http.post<any>(`${environment.baseUrl}/saveUser`, value, {observe : 'response'});
    }
  }