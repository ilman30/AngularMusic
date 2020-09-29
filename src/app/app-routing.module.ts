import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumsListComponent } from './albums/albumslist.component';
import { ArtisComponent } from './artis/artis.component';
import { ArtisListComponent } from './artis/artislist.component';
import { GenreComponent } from './genre/genre.component';
import { GenreListComponent } from './genre/genrelist.component';
import { HomeComponent } from './home/home.component';
import { LablesRekamanComponent } from './lablesRekaman/lablesRekaman.component';
import { LablesRekamanListComponent } from './lablesRekaman/lablesRekamanlist.component';
import { LaguComponent } from './lagu/lagu.component';
import { LaguListComponent } from './lagu/lagulist.component';

const routes: Routes = [

  {path:"beranda",component:HomeComponent},
  {path:"addlables",component:LablesRekamanComponent},
  {path:"listlables",component:LablesRekamanListComponent},
  {path:"addartis",component:ArtisComponent},
  {path:"listartis",component:ArtisListComponent},
  {path:"addgenre",component:GenreComponent},
  {path:"listgenre",component:GenreListComponent},
  {path:"addalbums",component:AlbumsComponent},
  {path:"listalbums",component:AlbumsListComponent},
  {path:"listalbums/:ids",component:AlbumsListComponent},
  {path:"addlagu",component:LaguComponent},
  {path:"listlagu",component:LaguListComponent},
  {path:"listlagu/:ids",component:LaguListComponent},
  {path:"listlagu/:idx",component:LaguListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
