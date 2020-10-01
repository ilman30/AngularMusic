import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { LablesRekaman } from './lablesRekaman';
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
    listLables: LablesRekaman[];

    constructor(private lablesRekamanService: LablesRekamanService){


    }


    ngOnInit(): void{
        this.cariForm = new FormGroup({
            namaLabels: new FormControl('')
        })
        this.lablesRekamanService.listLablesRekaman().subscribe((data)=>{
            console.log(data);
            this.listLables=data;
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

    deleteLables(id : number) {
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
                this.lablesRekamanService.deleteLables(id).subscribe(data => {
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
