import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AkunAdminComponent } from './akunAdmin/akunAdmin.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumsListComponent } from './albums/albumslist.component';
import { ArtisComponent } from './artis/artis.component';
import { ArtisListComponent } from './artis/artislist.component';
import { AuthGuardService } from './authGuard.service';
import { GenreComponent } from './genre/genre.component';
import { GenreListComponent } from './genre/genrelist.component';
import { HomeComponent } from './home/home.component';
import { LablesRekamanComponent } from './lablesRekaman/lablesRekaman.component';
import { LablesRekamanListComponent } from './lablesRekaman/lablesRekamanlist.component';
import { LaguComponent } from './lagu/lagu.component';
import { LaguListComponent } from './lagu/lagulist.component';
import { LoginComponent } from './login/login.component';
import { UserManajemenComponent } from './userManajemen/userManajemen.component';
import { UserManajemenListComponent } from './userManajemen/userManajemenlist.component';

const routes: Routes = [

  { 
    path:"",
    redirectTo:"/login", 
    pathMatch:"full"
  },

  {
    path:"register",
    component:AkunAdminComponent
  },


  {
    path:"login",
    component:LoginComponent
  },

  {
    path:"beranda",
    canActivate:[AuthGuardService], 
    data:{allowedRoles: ['role_user', 'role_admin', 'super_admin']}, 
    component:HomeComponent
  },

  {
    path:"addlables",
    canActivate:[AuthGuardService], 
    data:{allowedRoles: ['role_admin', 'super_admin']}, 
    component:LablesRekamanComponent
  },

  {
    path:"listlables",
    canActivate:[AuthGuardService], 
    data:{allowedRoles: ['role_user', 'role_admin', 'super_admin']}, 
    component:LablesRekamanListComponent
  },

  {
    path:"addartis",
    canActivate:[AuthGuardService], 
    data:{allowedRoles: ['role_admin', 'super_admin']}, 
    component:ArtisComponent
  },

  {
    path:"listartis",
    canActivate:[AuthGuardService], 
    data:{allowedRoles: ['role_user', 'role_admin', 'super_admin']},
    component:ArtisListComponent
  },

  {
    path:"addgenre",
    canActivate:[AuthGuardService], 
    data:{allowedRoles: ['role_admin', 'super_admin']}, 
    component:GenreComponent
  },

  {
    path:"listgenre",
    canActivate:[AuthGuardService], 
    data:{allowedRoles: ['role_user', 'role_admin', 'super_admin']},
    component:GenreListComponent
  },

  {
    path:"addalbums",
    canActivate:[AuthGuardService], 
    data:{allowedRoles: ['role_admin', 'super_admin']}, 
    component:AlbumsComponent
  },

  {
    path:"listalbums",
    canActivate:[AuthGuardService], 
    data:{allowedRoles: ['role_user', 'role_admin', 'super_admin']},
    component:AlbumsListComponent
  },

  {
    path:"listalbums/:ids",
    canActivate:[AuthGuardService], 
    data:{allowedRoles: ['role_user', 'role_admin', 'super_admin']},
    component:AlbumsListComponent
  },

  {
    path:"addlagu",
    canActivate:[AuthGuardService], 
    data:{allowedRoles: ['role_admin', 'super_admin']}, 
    component:LaguComponent
  },

  {
    path:"listlagu",
    canActivate:[AuthGuardService], 
    data:{allowedRoles: ['role_user', 'role_admin', 'super_admin']},
    component:LaguListComponent
  },

  {
    path:"listlagu/:ids",
    canActivate:[AuthGuardService], 
    data:{allowedRoles: ['role_user', 'role_admin', 'super_admin']},
    component:LaguListComponent
  },

  {
    path:"listlagu/:idx",
    canActivate:[AuthGuardService], 
    data:{allowedRoles: ['role_user', 'role_admin', 'super_admin']},
    component:LaguListComponent
  },
  
  {
    path:"usermanajemen",
    canActivate:[AuthGuardService], 
    data:{allowedRoles: ['super_admin']},
    component:UserManajemenComponent
  },
  {
    path:"usermanajemenlist",
    canActivate:[AuthGuardService], 
    data:{allowedRoles: ['super_admin']},
    component:UserManajemenListComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
