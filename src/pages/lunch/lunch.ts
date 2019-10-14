import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { BidModalPage } from '../bid-modal/bid-modal';
import { StateProvider } from '../../providers/state/state';

@IonicPage()
@Component({
  selector: 'page-lunch',
  templateUrl: 'lunch.html',
})
export class LunchPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
  public stateProvider: StateProvider) {
  }

  taskClicked(event, task) {

  	// chill out on quick user switch
    if(event.target.className.indexOf('badge-md-light') > -1) { return null; }

    const modal = this.modalCtrl.create(BidModalPage, { 'task' : task, 'type' : 'dinner' });
    modal.present(); 
  }

  addAssignee(e, user, task) {
    console.log('adding that person: ', user);
    console.log(e, task)
    this.stateProvider.submitDinnerAssign(task.id, user.id);
  }
}
