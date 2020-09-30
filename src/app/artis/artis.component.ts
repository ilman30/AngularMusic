import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Artis } from './artis';
import { ArtisService } from './artis.service';

@Component({
    selector: 'app-artis',
    templateUrl: './artis.component.html',
    providers: [ArtisService]
  })

  export class ArtisComponent implements OnInit {

    id: String;
    addArtisForm: FormGroup;

    selectedFiles: FileList;
    currentFile: File;
    progress = 0;

    constructor(private artisService: ArtisService, private route: ActivatedRoute, private router: Router) { 
        this.addArtisForm = new FormGroup({
          idArtis: new FormControl(null,[Validators.required]),
          namaArtis: new FormControl(null,[Validators.required, Validators.minLength(1)]),
          foto: new FormControl,
          urlWebsite: new FormControl,
          keterangan: new FormControl
        });
  
    }

    ngOnInit(): void {
    
        this.route.params.subscribe(rute => {
            this.id = rute.id;
            this.artisService.getArtisById(this.id).subscribe(data => {
            this.addArtisForm.get('idArtis').setValue(data.idArtis);
            this.addArtisForm.get('namaArtis').setValue(data.namaArtis);
            this.addArtisForm.get('foto').setValue(data.foto);
            this.addArtisForm.get('urlWebsite').setValue(data.urlWebsite);
            this.addArtisForm.get('keterangan').setValue(data.keterangan);
          }, error => {
            console.log(error);
          });
        });
      }

      simpanArtis(namaFile): void{
        console.log(this.addArtisForm.value);
        let art = new Artis();
        art.idArtis = this.addArtisForm.value.idArtis;
        art.namaArtis = this.addArtisForm.value.namaArtis;
        art.urlWebsite = this.addArtisForm.value.urlWebsite;
        art.foto = namaFile;
        art.keterangan = this.addArtisForm.value.keterangan;
        this.artisService.insertArtis(art).subscribe((data) => {
          console.log(data);
          this.router.navigate(['/listartis']);
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
              this.simpanArtis(event.body.namaFile);
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