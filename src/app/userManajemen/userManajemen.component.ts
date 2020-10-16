import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AkunAdmin } from '../akunAdmin/akunAdmin';
import { RegisterService } from '../register/register.service';
import { UserManajemenService } from './userManajemen.service';

@Component({
  selector: 'app-user-manajemen',
  templateUrl: './userManajemen.component.html',
  styleUrls: ['./userManajemen.component.css'],
  providers: [UserManajemenService, RegisterService]
})


export class UserManajemenComponent implements OnInit {

  id: String;
  registerAkunForm: FormGroup
  constructor(private userManajemenService: UserManajemenService, 
              private registerService: RegisterService, 
              private router: Router, 
              private route: ActivatedRoute) { 
    this.registerAkunForm = new FormGroup({
      username: new FormControl(null,[Validators.required]),
      keyword: new FormControl(null,[Validators.required, Validators.minLength(4)])
      })
  }

  ngOnInit(): void {
    
  }

  saveAdmin(){
    const value = this.registerAkunForm.value;
    this.registerService.saveAdmin(value).subscribe(response => {
      if(response.status == 201){
        alert("Register Sukses")
        this.router.navigate(["/usermanajemenlist"]);
      }
    }, error =>{
      alert("Cannot register")
    })
  }

}
