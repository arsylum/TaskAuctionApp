import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserModalPage } from './user-modal';
import { UserSelectorComponent, UserSelectorComponentModule } from '../../components/user-selector/user-selector';

@NgModule({
  declarations: [
    UserModalPage,
  ],
  imports: [
    IonicPageModule.forChild(UserModalPage),
    UserSelectorComponentModule
  ],
  entryComponents: [ UserSelectorComponent ]
})
export class UserModalPageModule {}
