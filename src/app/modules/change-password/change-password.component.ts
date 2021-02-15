import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { User } from '../../shared/service/user';
import {FormControl, FormGroupDirective, NgForm,FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

 public userProfile: User;
 // newPwd: string;
// oldPwd: string;
 // confirmPwd: string;
 changePasswordForm: FormGroup;
 hide: boolean = true;
 newpwdhide: boolean = true;
 designation;

  myFunction() {
    this.hide = !this.hide;
  }
  newpwdHide(){
    this.newpwdhide = !this.newpwdhide;
  }
  matcher = new MyErrorStateMatcher();

  constructor(private profileService: ProfileService, private formBuilder: FormBuilder,
              public router: Router, private sessionStorage: SessionStorageService) {

    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(24), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
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

  async updatePassword(){
    const newPwd = this.changePasswordForm.controls.password.value;
    const confirmPwd = this.changePasswordForm.controls.confirmPassword.value;
    const oldPwd = this.changePasswordForm.controls.oldPassword.value;
    try {
       // if (newPwd === confirmPwd){
            this.profileService.updatePassword(newPwd, oldPwd);
         //   window.alert('Your Password Successfully Changed');
         //   }else{
         //     window.alert('Confirm password & new password does not match');
         //   }
        } catch (error) {
            window.alert(error.message);
        }
    }

}
