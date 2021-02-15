import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {FormControl, FormGroupDirective, NgForm,FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OkDialogModel,DialogOkTemplateComponent } from '../../modules/dialog-ok-template/dialog-ok-template.component';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})

export class AdduserComponent implements OnInit {
// Upload Task
task: AngularFireUploadTask;

// Progress in percentage
percentage: Observable<number>;

// Snapshot of uploading file
snapshot: Observable<any>;

// Uploaded File URL
UploadedFileURL: Observable<string>;

// Uploaded Image List
// images: Observable<MyData[]>;

// File details
fileName: string;
fileSize: number;

// Status check
isUploading: boolean;
isUploaded: boolean;

imgUrl;
designation;
 

  addUserForm: FormGroup;

  matcher = new MyErrorStateMatcher();

  constructor(public authenticationService: AuthenticationService, private http: HttpClient,
              private formBuilder: FormBuilder, private storage: AngularFireStorage,
              public router: Router, private sessionStorage: SessionStorageService,
              public dialog: MatDialog,  public afAuth: AngularFireAuth) {

    this.addUserForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(24), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      designation: ['', [Validators.required]],
      gsdevision: ['', [Validators.required]]
    });
    this.isUploading = false;
    this.isUploaded = false;
   }


   uploadFile(event: FileList) {

    // The File object
    const file = event.item(0);
  
    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') {
     console.error('unsupported file type :( ');
     return;
    }
  
    this.isUploading = true;
    this.isUploaded = false;
  
  
    this.fileName = file.name;
  
    // The storage path
    const path = `UserStorage/${new Date().getTime()}_${file.name}`;
  
    // Totally optional metadata
    const customMetadata = { app: 'image Upload Demo' };
  
    // File reference
    const fileRef = this.storage.ref(path);
  
    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });
  
    // Get file progress percentage
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
  
      finalize(() => {
        // Get uploaded file storage path
        this.UploadedFileURL = fileRef.getDownloadURL();
  
        this.UploadedFileURL.subscribe(resp => {
         /* this.addImagetoDB({
            name: file.name,
            filepath: resp,
            size: this.fileSize
          });*/
          this.imgUrl = resp;
         // this.profileService.updateProfImg(this.userImg);
          console.log(this.imgUrl);
          this.isUploading = false;
          this.isUploaded = true;
        }, error => {
          console.error(error);
        });
      }),
      tap(snap => {
          this.fileSize = snap.totalBytes;
      })
    );
  }

  confirmDialog(): void {
    const message = `User Successfully Added`;

    const dialogData = new OkDialogModel('Message', message);

    const dialogRef = this.dialog.open(DialogOkTemplateComponent , {
      maxWidth: '400px',
      data: dialogData
    });

    /*dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if(this.result === true){
        this.deleteUser(userid);
      }
    });*/

  }

  addUser(){
   
    try{
  const designation = this.addUserForm.controls.designation.value;
  const fullName = this.addUserForm.controls.fullName.value;
  const password = this.addUserForm.controls.password.value;
  const email = this.addUserForm.controls.email.value;
  const gsdevision = this.addUserForm.controls.gsdevision.value;
 // this.afAuth.sendPasswordResetEmail(email);
  const url = 'https://us-central1-vetcare-a8650.cloudfunctions.net/register';
  this.http.get(url, {
      params: {
       email: email,
       password:password,
       designation:designation,
       fullName:fullName,
       gsdevision:gsdevision,
       userImg: this.imgUrl
      },
      observe: 'response'
    })
    .toPromise()
    .then(response => {
      console.log(response);
      window.alert('User Added');
    }).catch(console.log);
     this.confirmDialog();
  //   this.authenticationService.sendEmailLink(email);
  }catch (e){
    console.log(e);
   }

  }


  ngOnInit(): void {
    this.designation = this.sessionStorage.retrieve('designation');
    if (this.designation !== 'Admin' || this.designation === ''){
      this.router.navigate(['page-not-found']);
    }
  
  }

}
