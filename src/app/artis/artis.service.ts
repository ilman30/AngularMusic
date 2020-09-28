import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DataTablesRequest } from '../model/datatablesrequest.model';
import { DataTablesResponse } from '../model/datatablesresponse.model';
import { Artis } from './artis';

@Injectable()
export class ArtisService{

    constructor(private httpKlien: HttpClient){

    }

    insertArtis(artis: Artis): Observable<any> {
        return this.httpKlien.post(environment.baseUrl +'/saveartisjson' , artis)
        .pipe(map(data => data));
    }

    listArtis( ): Observable<Artis[]> {
        return this.httpKlien.get(environment.baseUrl +'/listartisjson')
        .pipe(map(data => <Artis[]> data));
    }

    getArtisById(id): Observable<Artis> {
        return this.httpKlien.get(environment.baseUrl +'/listartisjson/'+id)
        .pipe(map(data => data as Artis));
    }

    getListArtisAll(parameter: Map<string, any>, dataTablesParameters: any): Observable<DataTablesResponse> {
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
        return this.httpKlien.post(environment.baseUrl + '/listartisdatajson', dtReq
        ).pipe(map(data => data as DataTablesResponse));
    }

    upload(file: File): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();

        formData.append('file', file);

        const req = new HttpRequest('POST', environment.baseUrl + '/uploadartis', formData, {
            reportProgress: true,
            responseType: 'json'
        });

        return this.httpKlien.request(req);
    }

}