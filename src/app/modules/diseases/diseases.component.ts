import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiseaseService } from '../../service/disease.service';
import { Disease } from 'src/app/models/disease';
import { Observable } from 'rxjs';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-diseases',
  templateUrl: './diseases.component.html',
  styleUrls: ['./diseases.component.css']
})
export class DiseasesComponent implements OnInit {

  ctid;
  designation;
  disease: Disease = {
    cattleid: '',
    // veterinarianId: '',
    userid: '',
    date: '',
    clinicalSigns: '',
    typeOfClinicalSigns: '',
    diagnosis: '',
    treatment: '',
    remarks: ''
  }

  public diseases: Observable<Disease[]>;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private diseaseService: DiseaseService,
    private storage: SessionStorageService) {
      this.ctid = this.activatedRoute.snapshot.paramMap.get('id');
     }

     ngOnInit():void {
      this.diseases = this.diseaseService.getDiseases();

      this.designation = this.storage.retrieve('designation');
      if (this.designation !== 'Director' || this.designation === ''){
        this.router.navigate(['page-not-found']);
      }
    }
  
    ngAfterViewInit(): void{
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      if(id){
        this.diseaseService.getDisease(id).subscribe(diseaseData => {
          this.disease = diseaseData;
        });
      }
    }

}
