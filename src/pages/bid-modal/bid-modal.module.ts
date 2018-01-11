import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BidModalPage } from './bid-modal';
import { UserInfoDisplay, UserInfoDisplayModule } from '../../components/userInfoDisplay/userInfoDisplay';

@NgModule({
  declarations: [
    BidModalPage,
  ],
  imports: [
    IonicPageModule.forChild(BidModalPage),
    UserInfoDisplayModule,

  ],
  entryComponents: [
  	UserInfoDisplay,
  ],
})
export class BidModalPageModule {}
