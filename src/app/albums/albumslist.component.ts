import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AlbumsService } from './albums.service';

@Component({
    selector: 'app-home',
    templateUrl: './albumslist.component.html',
    providers: [AlbumsService]
})

export class AlbumsListComponent implements OnInit, OnDestroy {

    @ViewChild(DataTableDirective, {static: false})
    dtElement: DataTableDirective;
    dtOptions: any = {};
    dtTrigger: Subject<any> = new Subject();
    cariForm: FormGroup;

    constructor(private albumsService: AlbumsService){


    }

    ngOnInit(): void{
        this.cariForm = new FormGroup({
            namaAlbums: new FormControl('')
        })
        const that = this;
        this.dtOptions = {
            ajax: (dataTablesParameters: any, callback) => {
                const parameter = new Map<string, any>();
                parameter.set('namaAlbums', this.cariForm.controls.namaAlbums.value);
                that.albumsService.getListAlbumsAll(parameter, dataTablesParameters).subscribe(resp => {
                    callback({
                        recordsTotal: resp.recordsTotal,
                        recordsFiltered: resp.recordsFiltered,
                        data: resp.data,
                        draw: resp.draw
                    });
                });
            },
            serverSide: true,
            processing: true,
            filter: false,
            columns: [{
                title: 'ID',
                data: 'idAlbum',
            }, {
                title: 'Name',
                data: 'namaAlbums'
            }, {
                title: 'Nama Labels',
                data: 'namaLabels'
            }, {
                title: 'Nama Artis',
                data: 'namaArtis'
            }, {
                title: 'Foto Cover',
                data: 'fotoCover'
            }, {
                title: 'Keterangan',
                data: 'keterangan'
            },{
                title: 'Action',
                render(data, type, row){
                    return '<a hrev="editmethod/${row.idAlbum}" class="btn btn-warning btn-xs edit" data-element-id="${row.idAlbum}"><i>Edit</i></a>';
                }
            }]
        };
    }

    ngOnDestroy(): void{
        this.dtTrigger.unsubscribe();
    }

    rerender(): void{
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.draw();
        })
    }

    ngAfterViewInit(){
        
    }

}