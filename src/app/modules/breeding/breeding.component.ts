import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreedingService } from '../../service/breeding.service';
import { Breeding } from 'src/app/models/breeding';
import { Observable } from 'rxjs';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
@Component({
  selector: 'app-breeding',
  templateUrl: './breeding.component.html',
  styleUrls: ['./breeding.component.css']
})
export class BreedingComponent implements OnInit {

  ctid;
  designation;

  breeding: Breeding = {
    cattleid: '',
    dateOfHeatObserved: '',
    dateOfFirstAI: '',
    dateOfSecondAI: '',
    semanId: '',
    dateOfPD: '',
    dateOfLastCalving: '',
    noOfCalving: '',
    AIReceiptNo: ''
  }

  public breedings: Observable<Breeding[]>;
  constructor( private router: Router,
               private activatedRoute: ActivatedRoute,
               private breedingService: BreedingService,
               private storage: SessionStorageService) {
      this.ctid = this.activatedRoute.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {
      this.breedings = this.breedingService.getBreedings();
      this.designation = this.storage.retrieve('designation');
      if (this.designation !== 'Director' || this.designation === ''){
        this.router.navigate(['page-not-found']);
      }
    }
  
    ngAfterViewInit(): void{
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      if(id){
        this.breedingService.getBreeding(id).subscribe(breedingData => {
          this.breeding = breedingData;
        });
      }
    }

}
