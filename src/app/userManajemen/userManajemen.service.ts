import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AkunAdmin } from '../akunAdmin/akunAdmin';
import { GroupUser } from '../model/GroipUser';
import { Roles } from '../model/roles';

@Injectable({
  providedIn: 'root'
})
export class UserManajemenService {

  constructor(private httpKlien: HttpClient) { 
    
  }
  
  listAkun(): Observable<AkunAdmin[]>{
    return this.httpKlien.get(environment.baseUrl + '/listakunjson')
    .pipe(map(data=> <AkunAdmin[]>data));
  }

  getAkunById(id : String): Observable<AkunAdmin[]>{
    return this.httpKlien.get(environment.baseUrl + '/listakunjson/'+id)
      .pipe(map(data=> data as AkunAdmin[]));
  }

  listRoles(): Observable<Roles[]>{
    return this.httpKlien.get(environment.baseUrl + '/listrolesjson')
    .pipe(map(data=> <Roles[]>data));
  }

  checkingSuperAdmin(idUser : string): Observable<GroupUser>{
    if(idUser != null){
      return this.httpKlien.post(environment.baseUrl + '/checkingsuperadmin', idUser
      ).pipe(map( data => data as GroupUser));
    } else{
      console.error('error')
    }
  }


  
}