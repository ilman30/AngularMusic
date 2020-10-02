import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
                console.log(data);
                this.router.navigate(['/beranda']);
            }
        });
    }

    logout(){
        this.loggedIn = false;
        this.router.navigate(['/login']);
    }


    isAuthenticated(): boolean{
        const status = localStorage.getItem('isLogin');
        if(status === 'Y'){
            return true;
        } else{
            return false;
        }
    }

    // isAuthenticated() {
    //     const promise = new Promise(
    //         (resolve, rejects) => {
    //             setTimeout(() => {
    //                 resolve(this.loggedIn)
    //             }, 1000);
    //         }
    //     );
    //     return promise;
    // }
}