import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AkunAdmin } from './akunAdmin';
import { AkunAdminService } from './akunAdmin.service';

@Component({
    selector: 'app-home',
    templateUrl: './akunAdmin.component.html',
    providers: [AkunAdminService]
  })

  export class AkunAdminComponent{

    registerAkunForm: FormGroup

    constructor(private akunAdminService: AkunAdminService, private router: Router){
      this.registerAkunForm = new FormGroup({
        username: new FormControl(null,[Validators.required]),
        keyword: new FormControl(null,[Validators.required, Validators.minLength(4)])
        })

    }

    ngOnInit(): void {
      
    }
    
      registerAkun(): void{
        console.log(this.registerAkunForm.value);
        let reg = new AkunAdmin();
        reg.username = this.registerAkunForm.value.username;
        reg.keyword = this.registerAkunForm.value.keyword;  
        this.akunAdminService.registerAkun(reg).subscribe((data) => {
          console.log(data);
          this.router.navigate(['/login']);
        });
      }

      

  }