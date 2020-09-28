import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Genre } from './genre';
import { GenreService } from './genre.service';

@Component({
    selector: 'app-home',
    templateUrl: './genrelist.component.html',
    providers: [GenreService]
})

export class GenreListComponent implements OnInit, OnDestroy {

    @ViewChild(DataTableDirective, {static: false})
    dtElement: DataTableDirective;
    dtOptions: any = {};
    dtTrigger: Subject<any> = new Subject();
    cariForm: FormGroup;

    constructor(private genreService: GenreService, private router: Router){


    }

    ngOnInit(): void{
        this.cariForm = new FormGroup({
            namaGenre: new FormControl('')
        })
        const that = this;
        this.dtOptions = {
            ajax: (dataTablesParameters: any, callback) => {
                const parameter = new Map<string, any>();
                parameter.set('namaGenre', this.cariForm.controls.namaGenre.value);
                that.genreService.getListGenreAll(parameter, dataTablesParameters).subscribe(resp => {
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
                title: 'ID Genre',
                data: 'idGenre',
            }, {
                title: 'Name Genre',
                data: 'namaGenre'
            }, {
                title: 'Action',
                render(data, type, row){
                    return '<a hrev="editmethod/${row.idGenre}" class="btn btn-warning btn-xs edit" data-element-id="${row.idGenre}"><i>Edit</i></a>';
                }
            }, {
                title: 'Action',
                render(data, type, row){
                    return '<a (click)="deleteGenre(null)" class="btn btn-warning btn-xs edit" data-element-id="${row.idGenre}"><i>Delete</i></a>';
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

    deleteGenre(data: Genre){
        this.genreService.deleteGenre(data.idGenre).subscribe(response => {
            console.group('Oke', data.idGenre, response)
            if(response.status == 200){
                this.router.navigate[('/listgenre')];
            }
        })
    }


}