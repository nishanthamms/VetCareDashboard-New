import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { User } from '../../shared/service/user';
import {FormControl, FormGroupDirective, NgForm,FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OkDialogModel,DialogOkTemplateComponent } from '../../modules/dialog-ok-template/dialog-ok-template.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
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
 
 public userProfile: User;
 userImg;
 designation;
 updateProfileForm: FormGroup;

 matcher = new MyErrorStateMatcher();

  constructor(private profileService: ProfileService, private formBuilder: FormBuilder, private storage: AngularFireStorage,
              private sessionStorage: SessionStorageService, public router: Router, public dialog: MatDialog) {

    this.updateProfileForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(24), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
      email:['', [Validators.required, Validators.email]]
    });
    this.isUploading = false;
    this.isUploaded = false;
  }


  ngOnInit(): void {

    this.designation = this.sessionStorage.retrieve('designation');
    console.log(this.designation);

    if (this.designation === null){
      this.router.navigate(['page-not-found']);
    }

    this.profileService.getUserProfile().then(profile$ => {
      profile$.subscribe(userProfile => {
        this.userProfile = userProfile;
      });
    });
  }

  confirmDialog(): void {
    const message = `Your Profile Successfully Updated`;

    const dialogData = new OkDialogModel('Message', message);

    const dialogRef = this.dialog.open(DialogOkTemplateComponent , {
      maxWidth: '400px',
      data: dialogData
    });

  }

async updateProfile(){
  try{
  const name = this.updateProfileForm.controls.fullName.value;
  const password = this.updateProfileForm.controls.password.value;
  const email = this.updateProfileForm.controls.email.value;

  this.profileService.updateName(name);
  this.profileService.updateEmail(email, password);
 // this.confirmDialog();
  }catch (e){
    console.log(e);
  }
 // window.alert('Profile Updated');
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
        this.userImg = resp;
        this.profileService.updateProfImg(this.userImg);
        // console.log(this.cattle.cattleImg);
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



}
