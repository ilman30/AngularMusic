import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StatusLogin } from './model/StatusLogin';
import { UserAdmin } from './model/UserAdmin';

@Injectable()

export class AuthService {
    loggedIn = false;
    
    constructor(private router: Router, private httpKlien: HttpClient){

    }

    isLogin = false;
    // private currentLogin = 'access_token'

    login(username: string, password: string): void{
        const userAdmin = new UserAdmin();
        userAdmin.username = username;
        userAdmin.password = password;
        console.log(userAdmin);
        this.httpKlien.post(environment.baseUrl + '/login', userAdmin
        ).pipe(map(data => data as StatusLogin))
        .subscribe( data => {
            this.isLogin = data.isValid;
            console.log(data);
            if(this.isLogin){
                localStorage.setItem('isLogin', 'Y');
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', username);
                console.log(data);
                this.router.navigate(['/beranda']);
            }
        });
    }

    isAuthenticated(): boolean{
        const username = localStorage.getItem('username');
        const isLogin = localStorage.getItem('isLogin');
        const token = localStorage.getItem('token');
        const userAdmin = new UserAdmin();
        userAdmin.username = username;
        userAdmin.token = token;
        let statusLogin = false;
        if(token != null && username != null && isLogin === 'Y'){
            statusLogin = true;
        }
        return statusLogin;
    }

    isAuthorized(allowedRoles: string[]): boolean{
        const username = localStorage.getItem('username');
        const token = localStorage.getItem('token');
        let isLanjut = false;
        if(username != null){
            const userAdmin = new UserAdmin();
            userAdmin.username = username;
            userAdmin.token = token;
            this.httpKlien.post(environment.baseUrl + '/ceklogin', userAdmin
            ).pipe(map(data => data as StatusLogin)).subscribe(data => {
            isLanjut = (data.roles != null && allowedRoles.some(r => data.roles.includes(r)) && data.isValid);
            return isLanjut; 
            });
            
        }else{
            this.router.navigate(['/login']);
        }
        return isLanjut;
    }

    logout(){
        localStorage.removeItem('token');
        localStorage.clear();
        this.router.navigate(['/login']);
    }

}