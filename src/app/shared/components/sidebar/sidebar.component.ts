import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { ProfileService } from '../../../service/profile.service';
import { User } from '../../../shared/service/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public userProfile: User;
  designation;
  isDirectorHidden = false;
  isAdminHidden = false;
  constructor(public authenticationService: AuthenticationService,
              private storage: SessionStorageService, private profileService: ProfileService) {

              this.profileService.getUserProfile().then(profile$ => {
                profile$.subscribe(userProfile => {
                  this.userProfile = userProfile;
                   //  console.log(this.userProfile?.designation);
                  this.storage.store('designation', this.userProfile?.designation);
                });
            });
          }

  ngOnInit(): void {
    this.designation = this.storage.retrieve('designation');
    if (this.designation === 'Director'){
      this.isDirectorHidden = true;
    }else if (this.designation === 'Admin'){
      this.isAdminHidden = true;
        // this.isDirectorHidden = false;
    }
  }

}
