import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DogPage } from './dog';
import { UserInfoDisplay, UserInfoDisplayModule } from '../../components/userInfoDisplay/userInfoDisplay';
import { UserSelectorComponent, UserSelectorComponentModule } from '../../components/user-selector/user-selector';


@NgModule({
  declarations: [
    DogPage,
  ],
  imports: [
    IonicPageModule.forChild(DogPage),
    UserInfoDisplayModule,
    UserSelectorComponentModule
  ],
  entryComponents: [
  	UserInfoDisplay,
    UserSelectorComponent
  ]
})
export class DogPageModule {}
