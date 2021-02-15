import { Injectable } from '@angular/core';
import { User } from './../shared/service/user';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
// import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { AuthenticationService } from './../service/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { OkDialogModel,DialogOkTemplateComponent } from './../modules/dialog-ok-template/dialog-ok-template.component';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

 
  private userProfile: AngularFirestoreDocument<User>;
  private currentUser: firebase.User;
  constructor(
     private firestore: AngularFirestore,
     private  authService: AuthenticationService,
     public dialog: MatDialog
     ) { }

  async getUserProfile(): Promise<Observable<User>> {
    const user: firebase.User = await this.authService.getUser();
    this.currentUser = user;
    this.userProfile = this.firestore.doc(`userProfile/${user.uid}`);
    return this.userProfile.valueChanges();
  }

  confirmDialog(): void {
    const message = `Your Profile Successfully Updated`;

    const dialogData = new OkDialogModel('Message', message);

    const dialogRef = this.dialog.open(DialogOkTemplateComponent , {
      maxWidth: '400px',
      data: dialogData
    });
  }
  errorDialog(): void {
    const message = `Your Profile Not Updated`;

    const dialogData = new OkDialogModel('Message', message);

    const dialogRef = this.dialog.open(DialogOkTemplateComponent , {
      maxWidth: '400px',
      data: dialogData
    });
  }
  updateName(fullName: string): Promise<void> {
    return this.userProfile.update({ fullName });
  }
  updateProfImg(userImg: string): Promise<void> {
    return this.userProfile.update({ userImg });
  }
  updateDesignation(designation: string): Promise<void> {
    return this.userProfile.update({designation});
  }
  async updateEmail(newEmail: string, password: string): Promise<void> {
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      password
    );
    try {
      await this.currentUser.reauthenticateWithCredential(credential);
      await this.currentUser.updateEmail(newEmail);

     // window.alert('Your profile successfully updated');
      this.confirmDialog();
      return this.userProfile.update({ email: newEmail });
    } catch (error) {
      // window.alert(error.message);
      this.errorDialog();
    }
  }

  async updatePassword(
    newPassword: string,
    oldPassword: string
  ): Promise<void> {
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      oldPassword
    );
    try {
      await this.currentUser.reauthenticateWithCredential(credential);
      // window.alert('Your Password Successfully Changed');
      this.confirmDialog();
      return this.currentUser.updatePassword(newPassword);
    } catch (error) {
      // window.alert(error.message);
      this.errorDialog();
    }
  }
}
