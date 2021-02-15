import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { OtherProfileService } from '../../service/other-profile.service';
import { User } from '../../shared/service/user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {FormControl, FormGroupDirective, NgForm,FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize, tap } from 'rxjs/operators';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { MatDialog } from '@angular/material/dialog';
import { OkDialogModel,DialogOkTemplateComponent } from '../../modules/dialog-ok-template/dialog-ok-template.component';
import { GridColumnStyleBuilder } from '@angular/flex-layout/grid/typings/column/column';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}
@Component({
  selector: 'app-update-user-info',
  templateUrl: './update-user-info.component.html',
  styleUrls: ['./update-user-info.component.css']
})
export class UpdateUserInfoComponent implements OnInit {

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

  updateUserForm: FormGroup;

  matcher = new MyErrorStateMatcher();

  user: User = {
    uid: '',
    fullName: '',
    designation: '',
    email: '',
    userImg:''
  }
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private otherProfileService: OtherProfileService,
              private http: HttpClient, private formBuilder: FormBuilder, private storage: AngularFireStorage, 
              private sessionStorage: SessionStorageService, public dialog: MatDialog ) {

        this.updateUserForm = this.formBuilder.group({
            fullName: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(24), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
            email:['', [Validators.required, Validators.email]],
            designation: ['', [Validators.required]],
            gsdevision: ['', [Validators.required]]
        });

        this.isUploading = false;
        this.isUploaded = false;
    }

  ngOnInit(): void {
    this.designation = this.sessionStorage.retrieve('designation');
    if (this.designation !== 'Admin' || this.designation === ''){
      this.router.navigate(['page-not-found']);
    }
  }

  ngAfterViewInit(): void{
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id){
      this.otherProfileService.getUser(id).subscribe(userData => {
        this.user = userData;
      });
    }
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
    const message = `User Successfully Updated`;

    const dialogData = new OkDialogModel('Message', message);

    const dialogRef = this.dialog.open(DialogOkTemplateComponent , {
      maxWidth: '400px',
      data: dialogData
    });

  }


  updateUser(){
    try{
    const designation = this.updateUserForm.controls.designation.value;
    const fullName = this.updateUserForm.controls.fullName.value;
    const password = this.updateUserForm.controls.password.value;
    const email = this.updateUserForm.controls.email.value;
    const gsdevision = this.updateUserForm.controls.gsdevision.value;
    const userid = this.activatedRoute.snapshot.paramMap.get('id');
    const url = 'https://us-central1-vetcare-a8650.cloudfunctions.net/update';
    this.http.get(url, {
     params: {
     designation:designation,
     email:email,
     fullName:fullName,
     password:password,
     userid:userid,
     useremail: email,
     gsdevision: gsdevision,
     userImg: this.imgUrl
     },
     observe: 'response'
   })
   .toPromise()
   .then(response => {
     console.log(response);
   }).catch(console.log);
      this.confirmDialog();
    }catch (e){
      console.log(e);
    }
  }

}
