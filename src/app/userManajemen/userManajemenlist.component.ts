import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AkunAdmin } from '../akunAdmin/akunAdmin';
import { Roles } from '../model/roles';
import { UserManajemenService } from "./userManajemen.service";

@Component({
    selector: 'app-home',
    templateUrl: './userManajemenlist.component.html',
    providers: [UserManajemenService]
})

export class UserManajemenListComponent implements OnInit {

    
    cariForm: FormGroup;
    listAkun: AkunAdmin[];
    listRoles: Roles[];
    checked : string = "Y";

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