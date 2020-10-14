import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserManajemenService } from './userManajemen.service';

@Component({
    selector: 'app-user-manajemen',
    templateUrl: './userManajemenDetail.component.html',
    providers: [UserManajemenService]
  })

  export class UserManajemenDetailComponent implements OnInit {

    id: String;
    detailAkunForm: FormGroup;
    constructor(private userManajemenService: UserManajemenService, 
                private router: Router, 
                private route: ActivatedRoute) { 

        this.detailAkunForm = new FormGroup({
            id: new FormControl(null),
            username: new FormControl(null)
        })

    }

    ngOnInit(): void {
        this.route.params.subscribe(rute => {
          this.id = rute.id;
          if (this.id) {
            this.userManajemenService.getAkunById(this.id).subscribe( data => {
              this.detailAkunForm.get('id').setValue(data.id);
              this.detailAkunForm.get('username').setValue(data.username);
            }, error => {
              alert("Data Tidak Ditemukan !");
            });
          }
        });
      }

  }