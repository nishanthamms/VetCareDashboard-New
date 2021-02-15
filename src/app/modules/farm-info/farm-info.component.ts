import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Farm } from '../../models/Farm';
import { FarmService } from '../../service/farm.service';
import { Cattle } from 'src/app/models/Cattle';
import { CattleService } from 'src/app/service/cattle.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
@Component({
  selector: 'app-farm-info',
  templateUrl: './farm-info.component.html',
  styleUrls: ['./farm-info.component.css']
})
export class FarmInfoComponent implements OnInit {

  term = '';
  farm: Farm = {
    id: '',
    farmName: '',
    farmRegNo: '',
    ownerName: '',
    veterinarianDivision: '',
    GSDivision: '',
    address: '',
    contactNo: '',
    cattleCount: '',
    dairyCattleCount: ''
  }

  public cattles: Observable<Cattle[]>;
  fid: string;
  designation;
  q: number = 1;
  constructor(
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private farmService: FarmService,
              private cattleService: CattleService,
              private storage: SessionStorageService
              ) {
      // this.fid = localStorage.getItem('farmid');
    //  this.fid = sessionStorage.getItem('farmId');
        this.fid = this.activatedRoute.snapshot.paramMap.get('id');
    }

  ngOnInit() {
    this.cattles = this.cattleService.getCattles();
    this.designation = this.storage.retrieve('designation');
    if (this.designation !== 'Director' || this.designation === ''){
      this.router.navigate(['page-not-found']);
    }
  }
  ngAfterViewInit(): void{
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    
    if (id){
      this.farmService.getFarm(id).subscribe(farmData => {
        this.farm = farmData;
      });
    }
  }

  

  gotomore(cattleTagId){
    sessionStorage.setItem('cattleTagId', cattleTagId);
   // this.nav.navigateForward('tabs/chat');
   // this.router.navigateByUrl('/chat');
  }

}
