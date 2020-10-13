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

  // getListAkunAll(parameter: Map<string, any>, dataTablesParameters: any): Observable<DataTablesResponse> {
  //   const dtReq = new DataTablesRequest();
  //   dtReq.draw = dataTablesParameters.draw;
  //   dtReq.length = dataTablesParameters.length;
  //   dtReq.start = dataTablesParameters.start;
  //   dtReq.sortCol = dataTablesParameters.order[0].column;
  //   dtReq.sortDir = dataTablesParameters.order[0].dir;
  //   dtReq.extraParam = {};

  //   parameter.forEach((value, key) => {
  //       dtReq.extraParam[key] = value;
  //   });
  //   return this.httpKlien.post(environment.baseUrl + '/listakundatajson', dtReq
  //   ).pipe(map(data => data as DataTablesResponse));
  // }

  
}