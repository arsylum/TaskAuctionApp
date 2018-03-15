import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, ModalController, AlertController } from 'ionic-angular';
import { StateProvider } from '../../providers/state/state';
import { UserModalPage } from '../../pages/user-modal/user-modal';

@IonicPage()
@Component({
  selector: 'page-bid-modal',
  templateUrl: 'bid-modal.html',
})
export class BidModalPage {
  public task;
  public inputs;
  public type; //either 'auction', 'spont', or 'dinner'

  constructor(
  public navCtrl: NavController,
  public navParams: NavParams,
  public viewCtrl: ViewController,
  public stateProvider: StateProvider,
  private toastCtrl: ToastController,
  private modalCtrl: ModalController,
  private alertCtrl: AlertController
  ) {
    this.task = navParams.get('task');
    this.type = navParams.get('type');
    this.stateProvider = stateProvider;
    this.inputs = { bid: (this.task.bid ? (this.task.bid - 1) : '') };

    if(!this.stateProvider.isValidUser()) {
      const userModal = this.modalCtrl.create(UserModalPage, {});
      userModal.present();
    }
  }

  submitAuctionBid(event) {
    if(this.inputs.bid == ''
    || parseInt(this.stateProvider.settings.auctionState) !== 0
    ||(this.task.bid !== undefined && parseInt(this.task.bid) <= parseInt(this.inputs.bid))) {
      let toast = this.toastCtrl.create({
        message: 'Try harder (that\'s what she said)',
        duration: 2000,
        position: 'top',
        cssClass: 'error'
      });
      toast.present();
      return false;
    }
    
    let newTask = this.task;
    newTask.bid = this.inputs.bid;

    this.stateProvider.newAuctionBid(newTask);
    this.viewCtrl.dismiss();
  }

  submitSpontClaim(event) {
    this.stateProvider.spontClaim(this.task);
    this.viewCtrl.dismiss();
  }
  submitSpontDisclaim(event) {
    this.stateProvider.spontDisclaim(this.task);
  }

  submitDinnerClaim(event) {
    let task = this.task;
    if(task.winners.length) {
      const alert = this.alertCtrl.create({
        title: 'Take this dinner?',
        subTitle: 'Steal it from the current owners?',
        message: '',
        buttons: [
          {
            text: 'I am the master chef!',
            cssClass: 'button-md my-alert-button done',
            handler: data => { 
              this.stateProvider.submitDinnerClaim(task, false); //take it, don't join
              this.viewCtrl.dismiss();
            }
          },
          { 
            text: 'Not that hungry, actually.',
            cssClass: 'button-md my-alert-button irrelevant',
          }
        ]
      });
      alert.present();
    } else {
      this.stateProvider.submitDinnerClaim(task, false);
      this.viewCtrl.dismiss();
    }
  }

  submitCollaborate(events) {
    let msg = (this.type === 'dinner' ?
          'Too many cooks are spoiling the brei!' :
          'You have to ask the current owner(s) of this task first.'),
        confirm = (this.type === 'dinner' ?
          'We will cook like never before!' :
          'Agreement already established!'),
        decline = (this.type === 'dinner' ?
          'Okaaaay, no MSG...' :
          'Oh boy, let me reconsider.');

    const alert = this.alertCtrl.create({
      title: 'Achtung!',
      subTitle: 'Consensus required!',
      message: msg,
      buttons: [
        {
          text: confirm,
          cssClass: 'button-md my-alert-button done',
          handler: data => { 
            if(this.type === 'dinner') { this.stateProvider.submitDinnerClaim(this.task, true); }
            else { this.stateProvider.collabOn(this.task); }
            this.viewCtrl.dismiss();

          }
        },
        { 
          text: decline,
          cssClass: 'button-md my-alert-button irrelevant',
          handler: data => {

          }
        }
      ]
    });
    alert.present();
  }

  abandonDinner() {
    let task = this.task;
    const alert = this.alertCtrl.create({
      title: 'Noooooooooooooo!',
      message: '',
      buttons: ['Yes']
    });
    alert.present();
    
    this.stateProvider.abandonDinner(task, undefined);
    this.viewCtrl.dismiss();
  }


  userHasTask() {
    let i = this.task.winners.length;
    while(i--) { 
      if(this.task.winners[i] === this.stateProvider.uid) {
        return true; 
      }
    }

    return false;
  }
}
