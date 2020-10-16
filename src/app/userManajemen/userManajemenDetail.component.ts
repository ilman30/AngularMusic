import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AkunAdmin } from '../akunAdmin/akunAdmin';
import { Roles } from '../model/roles';
import { UserManajemenService } from './userManajemen.service';

@Component({
    selector: 'app-user-manajemen',
    templateUrl: './userManajemenDetail.component.html',
    providers: [UserManajemenService]
  })

  export class UserManajemenDetailComponent implements OnInit {

    
    akunAdmin: AkunAdmin[];
    listRole : Roles[];
    id: string;
    detailAkunForm: FormGroup;
    constructor(private userManajemenService: UserManajemenService, 
                private router: Router, 
                private route: ActivatedRoute) { 
    }

    ngOnInit(): void {
        this.detailAkunForm = new FormGroup({
          id: new FormControl('')
        }); 

        this.userManajemenService.listRoles().subscribe((data) => {
          this.listRole = data
          console.log(data)
        }, error =>{
          console.log(error)
        })

        this.route.params.subscribe( rute => {
          this.id = rute.id;
          this.userManajemenService.getAkunById(this.id).subscribe( data => {
            this.akunAdmin = data;
            console.log(data)
          }, error => {
            alert("error");
          })
        })
    }

    ambilAkun(): void{
      const id = this.detailAkunForm.get("id").value;
      this.userManajemenService.getAkunById(id).subscribe( data => {
        this.akunAdmin = data;
      })
    }

    check(id : string): Observable<boolean> | Promise<boolean> | boolean {
      return this.userManajemenService.checkingSuperAdmin(id)
      .pipe(map(data =>{
        if(data.isCheck != false){
          return true;
        } else{
          alert("error");
        }
      }))
    }

  }