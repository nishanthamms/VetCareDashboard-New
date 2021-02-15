import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import { Observable } from 'rxjs';
import { FarmService } from '../../service/farm.service';
import { Farm } from '../../models/Farm';
import { Router } from '@angular/router';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { ProfileService } from '../../service/profile.service';
import { User } from '../../shared/service/user';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  farmCount;
  cattlecount;
  value;
  designation;
  public userProfile: User;
  public farms: Observable<Farm[]>;
  constructor(private afs: AngularFirestore, private farmService: FarmService, private router: Router,
              private storage: SessionStorageService, private profileService: ProfileService) {
    this.afs.collection('farms').valueChanges()
    .subscribe( result => {
     this.farmCount = result.length;
    });

    this.afs.collection('cattles').valueChanges().subscribe( result => {
        this.cattlecount = result.length;
        });
      }

  ngOnInit(): void {
    this.farms = this.farmService.getFarms();

   /* this.profileService.getUserProfile().then(profile$ => {
      profile$.subscribe(userProfile => {
        this.userProfile = userProfile;
       //  console.log(this.userProfile?.designation);
        this.storage.store('designation', this.userProfile?.designation);
        console.log(this.userProfile?.designation);
      });
    });
    this.value = this.storage.retrieve('designation');
    console.log(this.value);*/

    this.afs.collection<any>('farms').valueChanges().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
     // this.dataSource.sort = this.sort;
      // this.dataSource.paginator = this.paginator;
      this.dataSource.paginator = this.paginator;
    });

    this.designation = this.storage.retrieve('designation');
    if (this.designation !== 'Director' || this.designation === ''){
      this.router.navigate(['page-not-found']);
    }

  }

}
