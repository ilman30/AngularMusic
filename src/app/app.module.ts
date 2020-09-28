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
    LaguListComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
