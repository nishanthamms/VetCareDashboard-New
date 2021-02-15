import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { Router } from '@angular/router';

//const sendmail = require('sendmail')();
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

   userCount;
   designation;

  constructor(private afs: AngularFirestore, public router: Router, private sessionStorage: SessionStorageService) {
    this.afs.collection('userProfile').valueChanges().subscribe( result => {
      this.userCount = result.length;
      });
   }


  ngOnInit(): void {
    this.designation = this.sessionStorage.retrieve('designation');
    if (this.designation !== 'Admin' || this.designation === ''){
      this.router.navigate(['page-not-found']);
    }
  }

}
