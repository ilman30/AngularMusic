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
        idAlbum: new FormControl(null,[Validators.required]),
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

  simpanAlbums(namaFile): void {
      
    console.log(this.addAlbumsForm.value);
    let albm = new Albums();
    albm.idAlbum = this.addAlbumsForm.value.idAlbum;
    albm.namaAlbums = this.addAlbumsForm.value.namaAlbums;
    albm.idLabel = this.addAlbumsForm.value.idLabel;
    albm.idArtis = this.addAlbumsForm.value.idArtis;
    albm.fotoCover = namaFile;
    albm.keterangan = this.addAlbumsForm.value.keterangan;
    this.albumsService.insertAlbums(albm).subscribe((data) => {
      
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
    this.albumsService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round( 100 * event.loaded / event.total);
        }else if (event instanceof HttpResponse) {
          console.log(event.body);
          this.simpanAlbums(event.body.namaFile);
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