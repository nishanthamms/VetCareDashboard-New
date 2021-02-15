import { AuthenticationService } from './../../../service/authentication.service';
import { Component, OnInit, Output, EventEmitter, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

   @Output() toggleSideBarForMe: EventEmitter<any> =  new EventEmitter();
  // isLoggedIn = false;

  constructor(
    public router: Router,
    public authenticationService: AuthenticationService,
    public ngZone: NgZone) { }

  ngOnInit() {

  //   this.isLoggedIn = this.authenticationService.isLoggedIn();
  //   console.log('menu ->' + this.isLoggedIn);
  // }

  // handleLogout() {
  //   this.authenticationService.Logout();
  // }

  // toggleSideBar(){
  //   this.toggleSideBarForMe.emit();
    }


    toggleSideBar() {
      this.toggleSideBarForMe.emit();
      setTimeout(() => {
        window.dispatchEvent(
          new Event('resize')
        );
      }, 300);
    }
}
