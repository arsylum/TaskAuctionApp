import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardPage } from './dashboard';
import { UserInfoDisplay, UserInfoDisplayModule } from '../../components/userInfoDisplay/userInfoDisplay';

@NgModule({
  declarations: [
    DashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(DashboardPage),
    UserInfoDisplayModule,
  ],
  entryComponents: [
  	UserInfoDisplay,
  ]
})
export class DashboardPageModule {}
