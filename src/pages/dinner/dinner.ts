import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { BidModalPage } from '../bid-modal/bid-modal';
import { StateProvider } from '../../providers/state/state';

@IonicPage()
@Component({
  selector: 'page-dinner',
  templateUrl: 'dinner.html',
})
export class DinnerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
  public stateProvider: StateProvider) {
  }

  taskClicked(event, task) {
    const modal = this.modalCtrl.create(BidModalPage, { 'task' : task, 'type' : 'dinner' });
    modal.present(); 
  }
}
