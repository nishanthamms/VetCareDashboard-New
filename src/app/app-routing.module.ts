import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { ReportsComponent } from './modules/reports/reports.component';
import { FarmsComponent } from './modules/farms/farms.component';
import { FarmInfoComponent } from './modules/farm-info/farm-info.component';
import { CattleInfoComponent } from './modules/cattle-info/cattle-info.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DefaultComponent } from './layouts/default/default.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VaccinationComponent } from './modules/vaccination/vaccination.component';
import { DiseasesComponent } from './modules/diseases/diseases.component';
import { BreedingComponent } from './modules/breeding/breeding.component';
import { AdduserComponent } from './modules/adduser/adduser.component';
import { RemoveUserComponent } from './modules/remove-user/remove-user.component';
import { UpdateUserComponent } from './modules/update-user/update-user.component';
import { UpdateUserInfoComponent } from './modules/update-user-info/update-user-info.component';
import { FarmReportComponent } from './modules/farm-report/farm-report.component';
import { ChangePasswordComponent } from './modules/change-password/change-password.component';
import { UpdateProfileComponent } from './modules/update-profile/update-profile.component';
import { AdminDashboardComponent } from './modules/admin-dashboard/admin-dashboard.component';
import { WelcomeUserComponent } from './modules/welcome-user/welcome-user.component';
import { Page404Component } from './modules/page404/page404.component';

const routes: Routes = [

  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},

  {path: 'sign-in', component: LoginComponent},
  {path: 'welcome-user', component: WelcomeUserComponent},
  {path: 'page-not-found', component: Page404Component},
  {path: 'forgot-password',
  component: ForgotPasswordComponent},

  { path: 'verify-email-address',
  component: VerifyEmailComponent },

  { path: '',
  component: DefaultComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent
    },
  {
      path: 'reports',
      component: ReportsComponent, canActivate: [AuthGuard]
  },

  {
    path: 'farminfo/:id',
    component: FarmInfoComponent
  },
  {
    path: 'cattleinfo/:id',
    component: CattleInfoComponent
  },
  {
    path: 'vaccination/:id',
    component: VaccinationComponent
  },
  {
    path: 'diseases/:id',
    component: DiseasesComponent
  },
  {
    path: 'breeding/:id',
    component: BreedingComponent
  },
  {
    path: 'farms',
    component: FarmsComponent
  },
  {
    path: 'farm-report',
    component: FarmReportComponent
  },
  {
    path: 'adduser',
    component: AdduserComponent
  },
  {
    path: 'remove-user',
    component: RemoveUserComponent
  },
  {
    path: 'update-user',
    component: UpdateUserComponent
  },
  {
    path: 'update-user-info/:id',
    component: UpdateUserInfoComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    path: 'update-profile',
    component: UpdateProfileComponent
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent
  },
  {
    path: 'logout',
    component: LoginComponent

  }]

}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
