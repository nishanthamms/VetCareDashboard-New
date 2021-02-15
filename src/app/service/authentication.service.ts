import { User } from './../shared/service/user';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import 'firebase/firestore';
import { first } from 'rxjs/operators';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { ProfileService } from './../service/profile.service';
import { MatDialog } from '@angular/material/dialog';
import { OkDialogModel, DialogOkTemplateComponent } from './../modules/dialog-ok-template/dialog-ok-template.component';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public userProfile: User;
  userData: any;
  designation;
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private storage: SessionStorageService,
    public dialog: MatDialog
  ){

    this.afAuth.authState.subscribe(user =>{
    if (user)
    {
      this.userData = user;
      localStorage.setItem('user', JSON.stringify(this.userData));
      JSON.parse(localStorage.getItem('user'));
    }
    else {
      localStorage.setItem('user', null);
      JSON.parse(localStorage.getItem('user'));
    }
  });


  }

  okdialog(message): void {
   // const message = `User Successfully Removed`;

    const dialogData = new OkDialogModel('Message', message);

    const dialogRef = this.dialog.open(DialogOkTemplateComponent , {
      maxWidth: '400px',
      data: dialogData
    });

  }
  getUser(): Promise<firebase.User> {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
   Login(email, password) {
    this.designation = this.storage.retrieve('designation');
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
           // if (this.designation === 'Director'){
              this.router.navigate(['welcome-user']);
           //   console.log(this.designation);
          //  }else if (this.designation === 'Admin'){
          //    this.router.navigate(['admin-dashboard']);
            //}
        });
        // this.SetUserData(result.user, fullName, null);
      }).catch((error) => {
       // window.alert(error.message);
        this.okdialog(error.message);
      });
    }

  /*  AddUser(email, password, fullName, designation) {


      return this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
          /* Call the SendVerificaitonMail() function when new user sign
          up and returns promise */

     /*     this.SendVerificationMail();
          this.SetUserData(result.user, fullName, designation);
        }).catch((error) => {
          window.alert(error.message)
        })
    }*/

   SendVerificationMail() {
      return this.afAuth.currentUser.then(u => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      })
    }

    ForgotPassword(passwordResetEmail) {
   //   return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
   return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
      //  window.alert('Password reset email sent, check your inbox.');
        this.okdialog('Password reset email sent, check your inbox.');
      }).catch((error) => {
       // window.alert(error)
        this.okdialog(error);
      })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }


  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      // this.SetUserData(result.user, null, null);
    }).catch((error) => {
     // window.alert(error)
      this.okdialog(error);
    })
  }

 /* async sendEmailLink(email) {
    const actionCodeSettings = { 
      url: 'https://localhost:4200', 
      handleCodeInApp: true,
    }
    try {
      await this.afAuth.sendEmailVerification(
        email,
        actionCodeSettings
      );
    //  window.localStorage.setItem('emailForSignIn', this.email);
      // this.emailSent = true;
    } catch (err) {
     //  this.errorMessage = err.message;
      window.alert(err);
    }
  }*/
  
 /* SetUserData(user, fullName, designation) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`userProfile/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      fullName: fullName,
      designation: designation
      // password: user.password
    }


    return userRef.set(userData, {
      merge: true
    })
  }*/

  // Sign out
  Logout() {
    return this.afAuth.signOut().then(() => {
      this.storage.clear('designation');
      this.router.navigate(['sign-in']);
    })
  }

}
