import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DinnerPage } from './dinner';
import { UserInfoDisplay, UserInfoDisplayModule } from '../../components/userInfoDisplay/userInfoDisplay';
import { UserSelectorComponent, UserSelectorComponentModule } from '../../components/user-selector/user-selector';

@NgModule({
  declarations: [
    DinnerPage,
  ],
  imports: [
    IonicPageModule.forChild(DinnerPage),
    UserInfoDisplayModule,
    UserSelectorComponentModule
  ],
  entryComponents: [
  	UserInfoDisplay,
    UserSelectorComponent
  ]
})
export class DinnerPageModule {}
