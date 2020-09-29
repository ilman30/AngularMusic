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
    listGenre: Genre[];

    constructor(private genreService: GenreService, private router: Router){


    }

    ngOnInit(): void{
        this.cariForm = new FormGroup({
            namaGenre: new FormControl('')
        })
        
        this.genreService.listGenre().subscribe((data)=>{
            console.log(data);
            this.listGenre=data;
        }, error => {
            console.log(error);
        })
            
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