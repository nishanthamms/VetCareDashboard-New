import { AuthenticationService } from './../service/authentication.service';
import { Component, OnInit } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { ProfileService } from './../service/profile.service';
import { User } from './../shared/service/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(public authenticationService: AuthenticationService, private storage: SessionStorageService,
              private profileService: ProfileService){

  }
    ngOnInit() {
     // this.storage.store('boundValue', this.attribute);
     // this.value = this.storage.retrieve('boundValue');
     // console.log(this.value);

    }

    loginUser(email, password){
        this.authenticationService.Login(email, password);
    }
  }
