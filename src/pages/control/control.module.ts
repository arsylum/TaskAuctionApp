import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ControlPage } from './control';
import { UserInfoDisplay, UserInfoDisplayModule } from '../../components/userInfoDisplay/userInfoDisplay';

@NgModule({
  declarations: [
    ControlPage,
  ],
  imports: [
    IonicPageModule.forChild(ControlPage),
    UserInfoDisplayModule,

  ],
  entryComponents: [
  	UserInfoDisplay,
  ],
})
export class ControlPageModule {}
