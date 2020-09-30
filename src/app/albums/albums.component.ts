import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Artis } from '../artis/artis';
import { ArtisService } from '../artis/artis.service';
import { LablesRekaman } from '../lablesRekaman/lablesRekaman';
import { LablesRekamanService } from '../lablesRekaman/lablesRekaman.service';
import { Albums } from './albums';
import { AlbumsService } from './albums.service';

@Component({
    selector: 'app-home',
    templateUrl: './albums.component.html',
    providers: [LablesRekamanService, AlbumsService, ArtisService]
  })

  export class AlbumsComponent implements OnInit {

    id: String;
    addAlbumsForm: FormGroup;
    listLables: LablesRekaman[];
    listArtis: Artis[];
    alamatGambar: string;

    selectedFiles: FileList;
    currentFile: File;
    progress = 0;

    constructor(private albumsService: AlbumsService, 
                private lablesRekamanService: LablesRekamanService, 
                private artisService: ArtisService, 
                private route: ActivatedRoute, 
                private router: Router) {
        
        this.addAlbumsForm = new FormGroup({
        idAlbums: new FormControl(null,[Validators.required]),
        namaAlbums: new FormControl(null,[Validators.required, Validators.minLength(4)]),
        idLabel: new FormControl(null,[Validators.required]),
        idArtis: new FormControl(null,[Validators.required]),
        fotoCover: new FormControl,
        keterangan: new FormControl

        });

        this.lablesRekamanService.listLablesRekaman().subscribe((data)=>{
        console.log(data);
        this.listLables=data;
        }, error => {
            console.log(error);
        })

        this.artisService.listArtis().subscribe((data)=>{
          console.log(data);
          this.listArtis=data;
          }, error => {
              console.log(error);
          })
  

    }

   ngOnInit(): void {
    this.route.params.subscribe(rute => {
      this.id = rute.id;
      this.albumsService.getAlbumsById(this.id).subscribe(data => {
        this.addAlbumsForm.get('idAlbum').setValue(data.idAlbum);
        this.addAlbumsForm.get('namaAlbums').setValue(data.namaAlbums);
        this.addAlbumsForm.get('idLabel').setValue(data.idLabel);
        this.addAlbumsForm.get('idArtis').setValue(data.idArtis);
        this.addAlbumsForm.get('fotoCover').setValue(data.fotoCover);
        this.addAlbumsForm.get('keterangan').setValue(data.keterangan);
      }, error => {
        console.log(error);
      });
    });
  }

  simpanAlbums(): void{
    this.upload();
    console.log(this.addAlbumsForm.value);
    let al = new Albums();
    al.idAlbum = this.addAlbumsForm.value.idAlbum;
    al.namaAlbums = this.addAlbumsForm.value.namaAlbums;  
    al.idLabel = this.addAlbumsForm.value.idLabel;
    al.idArtis = this.addAlbumsForm.value.idArtis;
    al.fotoCover = this.addAlbumsForm.value.fotoCover;
    al.keterangan = this.addAlbumsForm.value.keterangan;
    this.albumsService.insertAlbums(al).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/listalbums']);
    });
  }

  selectFile(event){
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    this.artisService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round( 100 * event.loaded / event.total);
        }else if (event instanceof HttpResponse) {
          console.log(event.body);
        }
      },
      err => {
        this.progress = 0;
        alert('Could not upload the file!');
        this.currentFile = undefined;
      });

    this.selectedFiles = undefined;
  }

}