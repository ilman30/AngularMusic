import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LablesRekaman } from './lablesRekaman';
import { LablesRekamanService } from './lablesRekaman.service';

@Component({
    selector: 'app-lables',
    templateUrl: './lablesRekaman.component.html',
    providers: [LablesRekamanService]
  })

  export class LablesRekamanComponent implements OnInit {

    id: String;
    addLablesRekamanForm: FormGroup;

    selectedFiles: FileList;
    currentFile: File;
    progress = 0;

    constructor(private lablesRekamanService: LablesRekamanService, private route: ActivatedRoute, private router: Router) { 
        this.addLablesRekamanForm = new FormGroup({
          idLabel: new FormControl(null,[Validators.required]),
          namaLabels: new FormControl(null,[Validators.required, Validators.minLength(4)]),
          alamat: new FormControl(null, [Validators.required]),
          noTelp: new FormControl(null, [Validators.required]),
          contactPerson: new FormControl(null, [Validators.required]),
          urlWebsite: new FormControl(null, [Validators.required])
        });
  
    }

    ngOnInit(): void {
    
      this.route.params.subscribe(rute => {
        this.id = rute.id;
        this.lablesRekamanService.getLablesRekamanById(this.id).subscribe(data => {
          this.addLablesRekamanForm.get('idLabel').setValue(data.idLabel);
          this.addLablesRekamanForm.get('namaLables').setValue(data.namaLabels);
          this.addLablesRekamanForm.get('alamat').setValue(data.alamat);
          this.addLablesRekamanForm.get('noTelp').setValue(data.noTelp);
          this.addLablesRekamanForm.get('contactPerson').setValue(data.contactPerson);
          this.addLablesRekamanForm.get('urlWebsite').setValue(data.urlWebsite);
        }, error => {
          console.log(error);
        });
      });
    }

    simpanLables(): void{
      console.log(this.addLablesRekamanForm.value);
      let lbls = new LablesRekaman();
      lbls.idLabel = this.addLablesRekamanForm.value.idLabel;
      lbls.namaLabels = this.addLablesRekamanForm.value.namaLabels;
      lbls.alamat = this.addLablesRekamanForm.value.alamat;
      lbls.noTelp = this.addLablesRekamanForm.value.noTelp;
      lbls.contactPerson = this.addLablesRekamanForm.value.contactPerson;
      lbls.urlWebsite = this.addLablesRekamanForm.value.urlWebsite;
      this.lablesRekamanService.insertLables(lbls).subscribe((data) => {
        console.log(data);
        this.router.navigate(['/listlables']);
      });
    }

    selectFile(event){
      this.selectedFiles = event.target.files;
    }

  
  }