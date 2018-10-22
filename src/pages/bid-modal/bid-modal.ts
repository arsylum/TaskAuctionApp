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
    this.inputs = { bid: (this.task.bid ? (this.task.bid - 1) : ''), bid1: Math.round(this.task.avg_value * 1.5) };

    if(!this.stateProvider.isValidUser()) {
      const userModal = this.modalCtrl.create(UserModalPage, {});
      userModal.present();
    }
  }

  submitAuctionBid(event) {
    let isInitial = this.task.bid === undefined;
    let errormsg = null;
    if(this.inputs.bid == ''
    || parseInt(this.stateProvider.settings.auctionState) !== 0
    ||(this.task.bid !== undefined && parseInt(this.task.bid) <= parseInt(this.inputs.bid))) {
      errormsg = 'Try harder (that\'s what she said)';
    }
    if(isInitial && (this.inputs.bid1 === undefined || this.inputs.bid1 === null || this.inputs.bid1 === '')) {
        errormsg = 'Without an initial offer we wont come ins Geschäft!';
    }
    if(isInitial && (parseInt(this.inputs.bid1) < parseInt(this.inputs.bid))) {
        errormsg = 'You got it all upside down, darling!';
    }
    if(errormsg !== null) {
      let toast = this.toastCtrl.create({
        message: errormsg,
        duration: 2000,
        position: 'top',
        cssClass: 'error'
      });
      toast.present();
      return false;
    }
    
    let newTask = this.task;
    newTask.bid = this.inputs.bid;

    // this is wrong and ugly on so many levels - but a very simple way to bring the 'initial&minimum at once' functionality
    // basically we are imitating the "bidding twice" user action
    if(isInitial) {
      console.log('it is iniaial!');
      newTask.bid = parseInt(this.inputs.bid1) + 1;
      this.stateProvider.newAuctionBid(newTask);
      newTask.bid = this.inputs.bid;
      let that = this;
      setTimeout(function() {
        that.stateProvider.newAuctionBid(newTask);
      }, 500);
    } else {
       this.stateProvider.newAuctionBid(newTask);
    }
   

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
