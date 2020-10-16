import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
  })

  export class RegisterComponent implements OnInit{
    registerForm: FormGroup

    constructor(private registerService : RegisterService, 
                private formBuilder : FormBuilder, 
                private router : Router) { }
    
    ngOnInit(): void {

        this.registerForm = this.formBuilder.group({
            username : this.formBuilder.control(null),
            keyword : this.formBuilder.control(null)
        });
    }

    saveUser(){
        const value = this.registerForm.value;
        this.registerService.saveUser(value).subscribe(response => {
          if(response.status == 201){
            alert("Anda telah mendaftar")
            this.router.navigate(["/login"]);
          }
        }, error =>{
          alert("Cannot register")
        })
      }
      
  }