import { Component, OnInit } from '@angular/core';
import { CattleService } from '../../service/cattle.service';
import { Cattle } from '../../models/Cattle';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
@Component({
  selector: 'app-cattle-info',
  templateUrl: './cattle-info.component.html',
  styleUrls: ['./cattle-info.component.css']
})
export class CattleInfoComponent implements OnInit {

  fid;
  ctid;
  designation;
  cattle: Cattle = {
    id: '',
    farmid: '',
    cattleTagId: '',
    cattleBreed: '',
    cattleDOB: '',
    specialFeature: '',
    sex: '',
    noLactation: '',
    birthWeg: '',
    breedingWeg: '',
    cattleWeaningWeg: '',
    avgPreWeg: '',
    avgPostWeg: '',
    lastCalvingDate: '',
    cattleImg: '',
  };
//  private cattles: Observable<Cattle[]>;


  constructor(private cattleService: CattleService, private router: Router,
              private activatedRoute: ActivatedRoute, private storage: SessionStorageService) {
              this.ctid = this.activatedRoute.snapshot.paramMap.get('id');
            //  this.fid =  sessionStorage.getItem('farmId');

              }

  ngOnInit() {
    this.designation = this.storage.retrieve('designation');
    if (this.designation !== 'Director' || this.designation === ''){
      this.router.navigate(['page-not-found']);
    }
  //  console.log(this.ctid);
  }

  ngAfterViewInit(): void{
    const id = this.activatedRoute.snapshot.paramMap.get('id');
   // console.log(id);
    if (id){
      this.cattleService.getCattle(id).subscribe(cattleData => {
        this.cattle = cattleData;
      });
    }
  }
  
  vaccine(){
   
    this.router.navigateByUrl('/vaccination/' + this.ctid);
   // console.log(this.ctid);
  }

  disease(){
    this.router.navigateByUrl('/diseases/' + this.ctid);
  }

  breeding(){
    this.router.navigateByUrl('/breeding/' + this.ctid);
  }


}
