import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AkunAdmin } from '../akunAdmin/akunAdmin';
import { DataTablesRequest } from '../model/datatablesrequest.model';
import { DataTablesResponse } from '../model/datatablesresponse.model';
import { Roles } from '../model/roles';

@Injectable({
  providedIn: 'root'
})
export class UserManajemenService {

  constructor(private httpKlien: HttpClient) { 
    
  }

  registerAdmin(akunAdmin: AkunAdmin): Observable<any> {
    return this.httpKlien.post(environment.baseUrl +'/registeradmin' , akunAdmin)
    .pipe(map(data => data));
  }

  listAkun(): Observable<AkunAdmin[]>{
    return this.httpKlien.get(environment.baseUrl + '/listakunjson')
    .pipe(map(data=> <AkunAdmin[]>data));
  }

  getAkunById(id): Observable<AkunAdmin>{
    return this.httpKlien.get(environment.baseUrl + '/listakunjson/'+id)
      .pipe(map(data=> data as AkunAdmin));
  }

  listRoles(): Observable<Roles[]>{
    return this.httpKlien.get(environment.baseUrl + '/listrolesjson')
    .pipe(map(data=> <Roles[]>data));
  }

  checkingSuperAdmin(idUser : string): boolean{
    let isChecked = false;
    if(idUser != null){
      this.httpKlien.post(environment.baseUrl + '/checkingsuperadmin', idUser
      ).pipe(map(data => data as boolean)).subscribe(data => {
       if(data = true){
        isChecked = data;
        console.log(isChecked);
        return isChecked;
       }
      });
    } else{
      isChecked = false;
    }
    return isChecked;
  }


  
}