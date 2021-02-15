import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { FarmService } from '../../service/farm.service';
import { Farm } from '../../models/Farm';
import { ActivatedRoute,Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Disease } from 'src/app/models/disease';
import { DiseaseService } from 'src/app/service/disease.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'] 
})
export class ReportsComponent implements OnInit {

  public farms: Observable<Farm[]>
  fid: string;
  designation;
  public diseases: Observable<Disease[]>;
  did: string;

  farmCount;
  cattleCount;
  sickCattleCount;
  pregnantCattleCount;
  vaccineCattleCount;

  femaleCattleCount;
  maleCattleCount;
  totalCattleCount;

  constructor(private afs: AngularFirestore,
              private farmService: FarmService, 
              private diseaseService: DiseaseService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private storage: SessionStorageService) { 

      this.afs.collection('farms').valueChanges()
        .subscribe( result => {
        this.farmCount = result.length;
      });

      this.afs.collection('cattles').valueChanges()
        .subscribe( result => {
        this.cattleCount = result.length;
      });

      this.afs.collection('diseases').valueChanges()
        .subscribe( result => {
        this.sickCattleCount = result.length;
      });

      this.afs.collection('breedings').valueChanges()
        .subscribe( result => {
        this.pregnantCattleCount = result.length;
      });

      this.afs.collection('vaccines').valueChanges()
        .subscribe( result => {
        this.vaccineCattleCount = result.length;
      });

      this.fid = sessionStorage.getItem('farmId');

      const sex = new Subject<string>();
      const queryObservable = sex.pipe(
        switchMap(sex =>
          this.afs.collection('cattles', ref => ref.where("sex", "==", sex)).valueChanges()
        )
      );
      // subscribe to changes
      queryObservable.subscribe(queriedItems => {
        // console.log(queriedItems.length);
        this.femaleCattleCount = queriedItems.length;

      });

      queryObservable.subscribe(queriedItems => {
        // console.log(queriedItems.length);
        this.maleCattleCount = queriedItems.length;
      });

      //trigger the query
      sex.next('female');

      //re-trigger the query
      sex.next('male');

      this.totalCattleCount = this.maleCattleCount + this.femaleCattleCount;

  }

  ngOnInit(): void {
    this.farms = this.farmService.getFarms();
    this.diseases = this.diseaseService.getDiseases();

    this.designation = this.storage.retrieve('designation');
  }

}
