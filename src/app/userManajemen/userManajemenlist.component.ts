import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AkunAdmin } from '../akunAdmin/akunAdmin';
import { Roles } from '../model/roles';
import { UserManajemenService } from "./userManajemen.service";

@Component({
    selector: 'app-home',
    templateUrl: './userManajemenlist.component.html',
    providers: [UserManajemenService]
})

export class UserManajemenListComponent implements OnInit {

    @ViewChild(DataTableDirective, {static: false})
    dtElement: DataTableDirective;
    dtOptions: any = {};
    dtTrigger: Subject<any> = new Subject();
    cariForm: FormGroup;
    listAkun: AkunAdmin[];
    listRoles: Roles[];

    constructor(private userManajemenService: UserManajemenService){

    }

    ngOnInit(): void{
        this.cariForm = new FormGroup({
            username: new FormControl('')
        })
        this.userManajemenService.listAkun().subscribe((data)=>{
            console.log(data);
            this.listAkun=data;
            }, error => {
                console.log(error);
        })
        this.userManajemenService.listRoles().subscribe((data)=>{
            console.log(data);
            this.listRoles=data;
            }, error => {
                console.log(error);
        })
    }

    
}