import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { LaguService } from './lagu.service';

@Component({
    selector: 'app-home',
    templateUrl: './lagulist.component.html',
    providers: [LaguService]
})

export class LaguListComponent implements OnInit, OnDestroy {
    @ViewChild(DataTableDirective, {static: false})
    dtElement: DataTableDirective;
    dtOptions: any = {};
    dtTrigger: Subject<any> = new Subject();
    cariForm: FormGroup;

    constructor(private laguService: LaguService){


    }

    ngOnInit(): void{
        this.cariForm = new FormGroup({
            namaLagu: new FormControl('')
        })
        const that = this;
        this.dtOptions = {
            ajax: (dataTablesParameters: any, callback) => {
                const parameter = new Map<string, any>();
                parameter.set('namaLagu', this.cariForm.controls.namaLagu.value);
                that.laguService.getListLaguAll(parameter, dataTablesParameters).subscribe(resp => {
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
                data: 'idLagu',
            }, {
                title: 'Judul',
                data: 'judul'
            }, {
                title: 'Durasi',
                data: 'durasi'
            }, {
                title: 'Nama Genre',
                data: 'namaGenre'
            }, {
                title: 'Nama Artis',
                data: 'namaArtis'
            }, {
                title: 'Nama Album',
                data: 'namaAlbums'
            }, {
                title: 'File Lagu',
                data: 'fileLagu'
            }, {
                title: 'Action',
                render(data, type, row){
                    return '<a href="editmethod/${row.idLagu}" class="btn btn-warning btn-xs edit" data-element-id="${row.idLagu}"><i>Edit</i></a>';
                }
            }],
            rowCallback(row, data, dataIndex){
                const idx = ((this.api().page()) * this.api().page.len()) + dataIndex + 1;
                $('td:eq(0)', row).html('<b>' + idx + '</b>');
            }
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