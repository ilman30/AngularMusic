import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
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

    deleteArtis(id : number) {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false,
        });
        swalWithBootstrapButtons.fire({
          title: 'Are you sure?',
          text: 'You want to remove the Catalog!',
          icon: 'warning',
          // type: 'warning'
          showCancelButton: true,
          showCloseButton: true,
          confirmButtonText: 'Yes, delete!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true
        }).then((result) => {
        console.log(`Delete Data By Id:` + id );
            if (result.value) {
                this.artisService.deleteArtis(id).subscribe(data => {
                    console.log(data);
                    this.refresh();
                });
            }
        });
      }

      refresh(): void {
        window.location.reload();
      }

}