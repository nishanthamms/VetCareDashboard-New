import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from './../../service/profile.service';
import { User } from './../../shared/service/user';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
@Component({
  selector: 'app-welcome-user',
  templateUrl: './welcome-user.component.html',
  styleUrls: ['./welcome-user.component.css']
})
export class WelcomeUserComponent implements OnInit {
  public userProfile: User;
  isDirectorHidden = false;
  isAdminHidden = false;
  designation;
  desig;
  name;
  isButtonHidden = false;
  isUserHidden = false;
  isImgHidden = false;
  constructor(public router: Router, private profileService: ProfileService, private storage: SessionStorageService) {

  }

  ngOnInit(): void {

  


   // this.designation = this.storage.retrieve('designation');
    this.profileService.getUserProfile().then(profile$ => {
    profile$.subscribe(userProfile => {
      this.userProfile = userProfile;
       //  console.log(this.userProfile?.designation);
      this.name =  this.userProfile?.fullName;
      this.designation = this.userProfile?.designation;
      if (this.designation === 'Director' || this.designation === 'Admin'){
        this.isUserHidden = true;
        this.isButtonHidden = false;
        this.isImgHidden = false;
      }else{
        this.isButtonHidden = true;
        this.isUserHidden = false;
        this.isImgHidden = true;
       }
      this.storage.store('designation', this.userProfile?.designation);
    });
  });

 }


  viewDashboard(){
    if (this.designation === 'Director'){
      // this.isDirectorHidden = true;
      console.log(this.designation);
      this.router.navigate(['dashboard']);
    }else if (this.designation === 'Admin'){
    //   this.isAdminHidden = true;
      this.router.navigate(['admin-dashboard']);
        // this.isDirectorHidden = false;
    }else{

    }
  }

  goBack(){
    this.router.navigate(['sign-in']);
  }
}
