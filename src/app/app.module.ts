import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LablesRekamanListComponent } from './lablesRekaman/lablesRekamanlist.component';
import { LablesRekamanComponent } from './lablesRekaman/lablesRekaman.component';
import { ArtisListComponent } from './artis/artislist.component';
import { GenreListComponent } from './genre/genrelist.component';
import { GenreComponent } from './genre/genre.component';
import { ArtisComponent } from './artis/artis.component';
import { AlbumsListComponent } from './albums/albumslist.component';
import { LaguListComponent } from './lagu/lagulist.component';
import { AlbumsComponent } from './albums/albums.component';
import { LaguComponent } from './lagu/lagu.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthGuardService } from './authGuard.service';
import { AkunAdminComponent } from './akunAdmin/akunAdmin.component';
import { UserManajemenComponent } from './userManajemen/userManajemen.component';
import { UserManajemenListComponent } from './userManajemen/userManajemenlist.component';
import { UserManajemenDetailComponent } from './userManajemen/userManajemenDetail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LablesRekamanListComponent,
    LablesRekamanComponent,
    ArtisComponent,
    ArtisListComponent,
    GenreComponent,
    GenreListComponent,
    AlbumsComponent,
    AlbumsListComponent,
    LaguComponent,
    LaguListComponent,
    LoginComponent,
    AkunAdminComponent,
    UserManajemenComponent,
    UserManajemenListComponent,
    UserManajemenDetailComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
