import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DinnerPage } from './dinner';
import { UserInfoDisplay, UserInfoDisplayModule } from '../../components/userInfoDisplay/userInfoDisplay';

@NgModule({
  declarations: [
    DinnerPage,
  ],
  imports: [
    IonicPageModule.forChild(DinnerPage),
    UserInfoDisplayModule,
  ],
  entryComponents: [
  	UserInfoDisplay,
  ]
})
export class DinnerPageModule {}
