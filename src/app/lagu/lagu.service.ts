import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DataTablesRequest } from '../model/datatablesrequest.model';
import { DataTablesResponse } from '../model/datatablesresponse.model';
import { Lagu } from './lagu';

@Injectable()
export class LaguService{

    constructor(private httpKlien: HttpClient){

    }

    insertLagu(lagu: Lagu): Observable<any> {
        return this.httpKlien.post(environment.baseUrl +'/savelagujson' , lagu)
        .pipe(map(data => data));
    }

    listLagu( ): Observable<Lagu[]> {
        return this.httpKlien.get(environment.baseUrl +'/listlagujson')
        .pipe(map(data => <Lagu[]> data));
    }

    getLaguById(id): Observable<Lagu> {
        return this.httpKlien.get(environment.baseUrl +'/listlagujson/'+id)
        .pipe(map(data => data as Lagu));
    }

    getLaguByAlbums(ids): Observable<Lagu[]> {
        return this.httpKlien.get(environment.baseUrl +'/listlagujson/'+ids)
        .pipe(map(data => data as Lagu[]));
    }

    getLaguByGenre(idx): Observable<Lagu[]> {
        return this.httpKlien.get(environment.baseUrl +'/listlagubygenrejson/'+idx)
        .pipe(map(data => data as Lagu[]));
    }

    getListLaguAll(parameter: Map<string, any>, dataTablesParameters: any): Observable<DataTablesResponse> {
        const dtReq = new DataTablesRequest();
        dtReq.draw = dataTablesParameters.draw;
        dtReq.length = dataTablesParameters.length;
        dtReq.start = dataTablesParameters.start;
        dtReq.sortCol = dataTablesParameters.order[0].column;
        dtReq.sortDir = dataTablesParameters.order[0].dir;
        dtReq.extraParam = {};

        parameter.forEach((value, key) => {
            dtReq.extraParam[key] = value;
        });
        return this.httpKlien.post(environment.baseUrl + '/listlagudatajson', dtReq
        ).pipe(map(data => data as DataTablesResponse));
    }

    upload(file: File): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();

        formData.append('file', file);

        const req = new HttpRequest('POST', environment.baseUrl + '/uploadlagu', formData, {
            reportProgress: true,
            responseType: 'json'
        });

        return this.httpKlien.request(req);
    }

    deleteLagu(id): Observable<any>{
        return this.httpKlien.delete(environment.baseUrl + '/deleteLagu/'+id)
        .pipe(map(data => data))
    }

}