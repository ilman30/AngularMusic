import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AkunAdmin } from '../akunAdmin/akunAdmin';
import { AkunAdminService } from '../akunAdmin/akunAdmin.service';
import { UserManajemenService } from './userManajemen.service';

@Component({
  selector: 'app-user-manajemen',
  templateUrl: './userManajemen.component.html',
  styleUrls: ['./userManajemen.component.css'],
  providers: [UserManajemenService]
})


export class UserManajemenComponent implements OnInit {
  registerAkunForm: FormGroup
  constructor(private userManajemenService: UserManajemenService, private router: Router) { 
    this.registerAkunForm = new FormGroup({
      username: new FormControl(null,[Validators.required]),
      keyword: new FormControl(null,[Validators.required, Validators.minLength(4)])
      })
  }

  ngOnInit(): void {
  }

  registerAdmin(): void{
    console.log(this.registerAkunForm.value);
    let reg = new AkunAdmin();
    reg.username = this.registerAkunForm.value.username;
    reg.keyword = this.registerAkunForm.value.keyword;  
    this.userManajemenService.registerAdmin(reg).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/usermanajemenlist']);
    });
  }

}
