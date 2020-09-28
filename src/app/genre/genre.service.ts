import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DataTablesRequest } from '../model/datatablesrequest.model';
import { DataTablesResponse } from '../model/datatablesresponse.model';
import { Genre } from './genre';

@Injectable()
export class GenreService{

    constructor(private httpKlien: HttpClient){

    }

    insertGenre(genre: Genre): Observable<any> {
        return this.httpKlien.post(environment.baseUrl +'/savegenrejson' , genre)
        .pipe(map(data => data));
    }

    listGenre( ): Observable<Genre[]> {
        return this.httpKlien.get(environment.baseUrl +'/listgenrejson')
        .pipe(map(data => <Genre[]> data));
    }

    getGenreById(id): Observable<Genre> {
        return this.httpKlien.get(environment.baseUrl +'/listgenrejson/'+id)
        .pipe(map(data => data as Genre));
    }

    getListGenreAll(parameter: Map<string, any>, dataTablesParameters: any): Observable<DataTablesResponse> {
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
        return this.httpKlien.post(environment.baseUrl + '/listgenredatajson', dtReq
        ).pipe(map(data => data as DataTablesResponse))
    }

    deleteGenre(id): Observable<any>{
        return this.httpKlien.delete(environment.baseUrl + '/delete/'+id)
        .pipe(map(data => data))
    }

}