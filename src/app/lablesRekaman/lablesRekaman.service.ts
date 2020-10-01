import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DataTablesRequest } from '../model/datatablesrequest.model';
import { DataTablesResponse } from '../model/datatablesresponse.model';
import { LablesRekaman } from './lablesRekaman';
import { environment } from 'src/environments/environment';

@Injectable()
export class LablesRekamanService{
    constructor(private httpKlien: HttpClient){

    }

    insertLables(lablesRekaman: LablesRekaman): Observable<any> {
        return this.httpKlien.post(environment.baseUrl +'/savelablesjson' , lablesRekaman)
        .pipe(map(data => data));
    }

    listLablesRekaman( ): Observable<LablesRekaman[]> {
        return this.httpKlien.get(environment.baseUrl +'/listlablesjson')
        .pipe(map(data => <LablesRekaman[]> data));
    }
    

    getLablesRekamanById(id): Observable<LablesRekaman> {
        return this.httpKlien.get(environment.baseUrl +'/listlablesjson/'+id)
        .pipe(map(data => data as LablesRekaman));
    }

    getListLablesRekamanAll(parameter: Map<string, any>, dataTablesParameters: any): Observable<DataTablesResponse> {
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
        return this.httpKlien.post(environment.baseUrl + '/listlablesdatajson', dtReq
        ).pipe(map(data => data as DataTablesResponse));
    }

    // upload(file: File): Observable<HttpEvent<any>> {
    //     const formData: FormData = new FormData();

    //     formData.append('file', file);

    //     const req = new HttpRequest('POST', environment.baseUrl + '/upload', formData, {
    //         reportProgress: true,
    //         responseType: 'json'
    //     });

    //     return this.httpKlien.request(req);
    // }

    deleteLables(id): Observable<any>{
        return this.httpKlien.delete(environment.baseUrl + '/deleteLables/'+id)
        .pipe(map(data => data))
    }
}