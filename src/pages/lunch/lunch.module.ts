import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LunchPage } from './lunch';
import { UserInfoDisplay, UserInfoDisplayModule } from '../../components/userInfoDisplay/userInfoDisplay';
import { UserSelectorComponent, UserSelectorComponentModule } from '../../components/user-selector/user-selector';

@NgModule({
  declarations: [
    LunchPage,
  ],
  imports: [
    IonicPageModule.forChild(LunchPage),
    UserInfoDisplayModule,
    UserSelectorComponentModule
  ],
  entryComponents: [
  	UserInfoDisplay,
    UserSelectorComponent
  ]
})
export class LunchPageModule {}
