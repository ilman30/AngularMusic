import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { LablesRekamanService } from "./lablesRekaman.service";

@Component({
    selector: 'app-home',
    templateUrl: './lablesRekamanlist.component.html',
    providers: [LablesRekamanService]
})

export class LablesRekamanListComponent implements OnInit, OnDestroy {

    @ViewChild(DataTableDirective, {static: false})
    dtElement: DataTableDirective;
    dtOptions: any = {};
    dtTrigger: Subject<any> = new Subject();
    cariForm: FormGroup;

    constructor(private lablesRekamanService: LablesRekamanService){


    }


    ngOnInit(): void{
        this.cariForm = new FormGroup({
            namaLabels: new FormControl('')
        })
        const that = this;
        this.dtOptions = {
            ajax: (dataTablesParameters: any, callback) => {
                const parameter = new Map<string, any>();
                parameter.set('namaLabels', this.cariForm.controls.namaLabels.value);
                that.lablesRekamanService.getListLablesRekamanAll(parameter, dataTablesParameters).subscribe(resp => {
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
                data: 'idLabel',
            }, {
                title: 'Name',
                data: 'namaLabels'
            }, {
                title: 'Alamat',
                data: 'alamat'
            }, {
                title: 'Nomor Telepom',
                data: 'noTelp'
            }, {
                title: 'Contact Person',
                data: 'contactPerson'
            }, {
                title: 'URL Website',
                data: 'urlWebsite'
            }, {
                title: 'Action',
                render(data, type, row){
                    return '<a hrev="editmethod/${row.idLabel}" class="btn btn-warning btn-xs edit" data-element-id="${row.idLabel}"><i>Edit</i></a>';
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
