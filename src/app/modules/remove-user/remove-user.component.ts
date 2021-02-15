import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel,DialogTemplateComponent } from '../../modules/dialog-template/dialog-template.component';
import { OkDialogModel, DialogOkTemplateComponent } from '../../modules/dialog-ok-template/dialog-ok-template.component';
@Component({
  selector: 'app-remove-user',
  templateUrl: './remove-user.component.html',
  styleUrls: ['./remove-user.component.css']
})
export class RemoveUserComponent implements OnInit {

  users: any;
  term: '';
  designation;
  q: number = 1;
  result;
  private userCollection: AngularFirestoreCollection;


  constructor(private afs: AngularFirestore, private http: HttpClient,
              public router: Router, private sessionStorage: SessionStorageService,public dialog: MatDialog) {
    this.userCollection = this.afs.collection('userProfile');
   }

   confirmDialog(userid): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(DialogTemplateComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if(this.result === true){
        this.deleteUser(userid);
      }
    });

  }
  okdialog(): void {
    const message = `User Successfully Removed`;

    const dialogData = new OkDialogModel('Message', message);

    const dialogRef = this.dialog.open(DialogOkTemplateComponent , {
      maxWidth: '400px',
      data: dialogData
    });

  }
  deleteUser(userid){

    try{
    const url = 'https://us-central1-vetcare-a8650.cloudfunctions.net/delete';

    this.http.get(url, {
      params: {
       userid: userid,
      },
      observe: 'response'
    })
    .toPromise()
    .then(response => {
      console.log(response);
    }).catch(console.log);
    this.okdialog();
   }catch(e){
    console.log(e);
   }
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
