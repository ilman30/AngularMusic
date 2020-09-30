import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Artis } from './artis';
import { ArtisService } from './artis.service';

@Component({
    selector: 'app-home',
    templateUrl: './artislist.component.html',
    providers: [ArtisService]
})

export class ArtisListComponent implements OnInit, OnDestroy {

    @ViewChild(DataTableDirective, {static: false})
    dtElement: DataTableDirective;
    dtOptions: any = {};
    dtTrigger: Subject<any> = new Subject();
    cariForm: FormGroup;
    listArtis: Artis[];

    constructor(private artisService: ArtisService){


    }

    ngOnInit(): void{
        this.cariForm = new FormGroup({
            namaArtis: new FormControl('')
        })
        this.artisService.listArtis().subscribe((data)=>{
            console.log(data);
            this.listArtis=data;
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

    

}