import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit{

    constructor(private authService: AuthService){

    }

    ngOnInit(){
        
    }

    onLogin(username: HTMLInputElement, password: HTMLInputElement){
        this.authService.login(username.value, password.value);
    }

}