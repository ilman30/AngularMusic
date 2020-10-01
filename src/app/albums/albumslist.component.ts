import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Artis } from '../artis/artis';
import { ArtisService } from '../artis/artis.service';
import { Albums } from './albums';
import { AlbumsService } from './albums.service';

@Component({
    selector: 'app-home',
    templateUrl: './albumslist.component.html',
    providers: [AlbumsService, ArtisService]
})

export class AlbumsListComponent implements OnInit, OnDestroy {

    @ViewChild(DataTableDirective, {static: false})
    dtElement: DataTableDirective;
    dtOptions: any = {};
    dtTrigger: Subject<any> = new Subject();
    cariForm: FormGroup;
    listAlbums: Albums[];
    listArtis: Artis[];
    alamatGambar: string;
    form: FormGroup;
    ids: string;

    constructor(private albumsService: AlbumsService, private artisService: ArtisService, private activateRoute: ActivatedRoute){
        
        this.albumsService.listAlbums().subscribe((data)=>{
            console.log(data);
            this.listAlbums=data;
            }, error => {
                console.log(error);
            })
    }

    ngOnInit(): void{
        
        this.cariForm = new FormGroup( {
            namaAlbums: new FormControl('')
        });

        this.form = new FormGroup( {
            ids: new FormControl('')
        });
        

        this.artisService.listArtis().subscribe((data)=>{
            console.log(data);
            this.listArtis=data;
            }, error => {
                console.log(error);
            })
        this.activateRoute.params.subscribe( rute => {
        this.ids = rute.ids;
        this.albumsService.getAlbumsByArtis(this.ids).subscribe( data => {
        this.listAlbums = data;
        }, error => {
            console.log(error);
            });
        });

        
            
        
    }

    ngOnDestroy(): void{
        this.dtTrigger.unsubscribe();
    }

    ambilAlbums(): void{
        const idArtis = this.form.get("idArtis").value;
        this.albumsService.getAlbumsByArtis(idArtis).subscribe( data => {
          this.listAlbums = data;
        })
      }

      deleteAlbums(id : number) {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false,
        });
        swalWithBootstrapButtons.fire({
          title: 'Are you sure?',
          text: 'You want to remove the Catalog!',
          icon: 'warning',
          // type: 'warning'
          showCancelButton: true,
          showCloseButton: true,
          confirmButtonText: 'Yes, delete!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true
        }).then((result) => {
        console.log(`Delete Data By Id:` + id );
            if (result.value) {
                this.albumsService.deleteAlbums(id).subscribe(data => {
                    console.log(data);
                    this.refresh();
                });
            }
        });
      }

      refresh(): void {
        window.location.reload();
      }



}