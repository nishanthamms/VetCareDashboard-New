import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  users: any;
  term: '';
  designation;
  q: number = 1;
  private userCollection: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore, private http: HttpClient,
              public router: Router, private sessionStorage: SessionStorageService) {
    this.userCollection = this.afs.collection('userProfile');
   }

   updateUser(){
    const url = 'https://us-central1-vetcare-a8650.cloudfunctions.net/update';
    this.http.get(url, {
     params: {
     userid:'PJzjSzXIU5X2UeLN6q8BqMX9Ojq1',
     useremail:'nishantha123@gmail.com',
     },
     observe: 'response'
   })
   .toPromise()
   .then(response => {
     console.log(response);
   })
   .catch(console.log);
  }
  ngOnInit(): void {

    this.designation = this.sessionStorage.retrieve('designation');
    if (this.designation !== 'Admin' || this.designation === ''){
      this.router.navigate(['page-not-found']);
    }


    this. users = this.userCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
}
