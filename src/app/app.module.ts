import { AuthenticationService } from './service/authentication.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { DefaultModule } from './layouts/default/default.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { FarmsComponent } from './modules/farms/farms.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FarmInfoComponent } from './modules/farm-info/farm-info.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import { CattleInfoComponent } from './modules/cattle-info/cattle-info.component';
import { VaccinationComponent } from './modules/vaccination/vaccination.component';
import { DiseasesComponent } from './modules/diseases/diseases.component';
import { BreedingComponent } from './modules/breeding/breeding.component';
import { AdduserComponent } from './modules/adduser/adduser.component';
import { RemoveUserComponent } from './modules/remove-user/remove-user.component';
import { UpdateUserComponent } from './modules/update-user/update-user.component';
import { UpdateUserInfoComponent } from './modules/update-user-info/update-user-info.component';
import { FarmReportComponent } from './modules/farm-report/farm-report.component';
import * as jsPDF from 'jspdf';
import { DatePipe } from '@angular/common';
import { ChangePasswordComponent } from './modules/change-password/change-password.component';
import { UpdateProfileComponent } from './modules/update-profile/update-profile.component';
import { AdminDashboardComponent } from './modules/admin-dashboard/admin-dashboard.component';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { WelcomeUserComponent } from './modules/welcome-user/welcome-user.component';
import { Page404Component } from './modules/page404/page404.component';
import {ConfirmationPopoverModule} from 'angular-confirmation-popover';
import { NgxPaginationModule } from 'ngx-pagination';
import {NgxDialogsModule} from 'ngx-dialogs';
import { DialogTemplateComponent } from './modules/dialog-template/dialog-template.component';
import { DialogOkTemplateComponent } from './modules/dialog-ok-template/dialog-ok-template.component';
import {MatSidenavModule} from '@angular/material/sidenav'; 
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    FarmsComponent,
    FarmInfoComponent,
    CattleInfoComponent,
    VaccinationComponent,
    DiseasesComponent,
    BreedingComponent,
    AdduserComponent,
    RemoveUserComponent,
    UpdateUserComponent,
    UpdateUserInfoComponent,
    FarmReportComponent,
    ChangePasswordComponent,
    UpdateProfileComponent,
    AdminDashboardComponent,
    WelcomeUserComponent,
    Page404Component,
    DialogTemplateComponent,
    DialogOkTemplateComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    FlexLayoutModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    HttpClientModule,
    MatDividerModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgxDialogsModule,
    ConfirmationPopoverModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    NgxWebstorageModule.forRoot(),
    AngularFirestoreModule,
    MatSidenavModule,
    AgGridModule.withComponents([]),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthenticationService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
 
 }
