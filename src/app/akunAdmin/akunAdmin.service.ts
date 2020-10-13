import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AkunAdmin } from './akunAdmin';

@Injectable()
export class AkunAdminService{
    constructor(private httpKlien: HttpClient){

    }

    registerAkun(akunAdmin: AkunAdmin): Observable<any> {
        return this.httpKlien.post(environment.baseUrl +'/registerakun' , akunAdmin)
        .pipe(map(data => data));
    }

    

}