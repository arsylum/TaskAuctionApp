import { Component, NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
// import { DataProvider } from '../../providers/data/data'; 
import { StateProvider } from '../../providers/state/state';
// import { UserProvider} from '../../providers/user/user';
import { ModalController } from 'ionic-angular';
import { UserModalPage } from '../../pages/user-modal/user-modal';

@Component({
  selector: 'user-info-display',
  template: `

      <button ion-button secondary (click)="presentUserPrompt()">
        {{ (stateProvider.user.name.length ? stateProvider.user.name : 'Select User') }}
      </button>
      <ion-badge item-end class="points"><ion-icon name="add-circle"></ion-icon> {{ this.stateProvider.user_current_gain }} </ion-badge>`
})
export class UserInfoDisplay {

	constructor( //private userProvider: UserProvider) {
	public stateProvider: StateProvider,
	private modalCtrl: ModalController
	){
	}

	presentUserPrompt(){
    const userModal = this.modalCtrl.create(UserModalPage, { 'task' : null , type : 'auction'});
      userModal.present();

  }
}



@NgModule({
  declarations: [
    UserInfoDisplay,
  ],
  imports: [
    IonicModule,
  ],
  entryComponents: [
    UserInfoDisplay,
  ],
  exports: [
    UserInfoDisplay,
  ]
})
export class UserInfoDisplayModule {}