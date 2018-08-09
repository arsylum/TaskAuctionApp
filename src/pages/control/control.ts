import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { StateProvider } from '../../providers/state/state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-control',
  templateUrl: 'control.html'
})
export class ControlPage {
  public userCount;
  public points;
  private inMaintenanceMode: boolean;
  public settingsForm: FormGroup;

  constructor(public navCtrl: NavController,
  public stateProvider: StateProvider,
  public alertCtrl: AlertController,
  public formBuilder: FormBuilder
  ) {
    this.inMaintenanceMode = stateProvider.settings.auctionState == 2;

    this.settingsForm = formBuilder.group({
      closingTime : [stateProvider.settings.closing_time, Validators.pattern('(Mon|Tue|Wed|Thu|Fri|Sat|Sun) ([01][0-9]|2[0-3]):[0-5][0-9]')],
      dinnerValue : [stateProvider.settings.dinner_value, Validators.pattern('[0-9]+')],
      dogValue : [stateProvider.settings.dog_value, Validators.pattern('[0-9]+')],
    });
  }

  enableMaintenanceMode() {
    this.stateProvider.updateAuctionState(2);
  }
  disableMaintenanceMode() {
    this.stateProvider.updateAuctionState(null);
  }

  completionIsReady() {
    return !(this.readyTasks() < this.totalTasks());
  }

  totalTasks() {
    return this.stateProvider.tasks.auction.length;
  }

  readyTasks() {
    let i = this.stateProvider.tasks.auction.length, count = 0;
    while(i--) {
      if(this.stateProvider.tasks.auction[i].status !== null) {
        count++; 
      } 
    }
    return count;
  }

  finishPlenumMode() {
    const alert = this.alertCtrl.create({
      title: 'Iterate week',
      subTitle: 'Finish the meeting',
      message: 'Calculate all the points',
      buttons: [
        {
          text: 'Go for it!',
          cssClass: 'button-md my-alert-button done',
          handler: data => { 
            this.confirmDinners(); 
          }
        },
        {
          text: 'Hold on',
          cssClass: 'button-md my-alert-button failed',
        }
      ]
    });
    alert.present();
  }

  confirmDinners() {
    const alert = this.alertCtrl.create({
      title: 'Dinners?',
      subTitle: 'Did you eat?',
      message: 'Did they happen as listed on the dinners page?',
      buttons: [
        {
          text: 'Sure did!',
          cssClass: 'button-md my-alert-button done',
          handler: data => { 
            this.confirmTasks(); 
          }
        },
        {
          text: 'What, dinners?',
          cssClass: 'button-md my-alert-button failed',
        }
      ]
    });
    alert.present();
  }

  confirmTasks() {
    const alert = this.alertCtrl.create({
      title: 'All good?',
      subTitle: 'Checking the tasks.',
      message: 'Did you confirm all the auction tasks have the correct status and all listed spontaneous tasks got done?',
      buttons: [
        {
          text: 'Erm...yes, for course!',
          cssClass: 'button-md my-alert-button done',
          handler: data => { 
            this.confirmFinishPlenumMode(); 
          }
        },
        {
          text: 'There was cake? WHAAAT?',
          cssClass: 'button-md my-alert-button failed',
        }
      ]
    });
    alert.present();
  }

  confirmFinishPlenumMode() {
    const alert = this.alertCtrl.create({
      title: 'Are you sure?',
      subTitle: 'This step is non-reversible.',
      message: 'Missuse will load the hatred of the catministrator upon you!',
      buttons: [
        {
          text: 'I am not afraid!',
          cssClass: 'button-md my-alert-button done',
          handler: data => { 
            this.finalConfirmFinishPlenumMode(); 
          }
        },
        {
          text: 'okaaay, nevermind',
          cssClass: 'button-md my-alert-button failed',
        }
      ]
    });
    alert.present();
  }

  finalConfirmFinishPlenumMode() {
    const alert = this.alertCtrl.create({
      title: 'Just kidding',
      subTitle: 'That previous step was still reversible.',
      message: 'But this one ain\'t, I\'m seriously serious!',
      buttons: [
        {
          text: 'Crunch data!',
          cssClass: 'button-md my-alert-button done',
          handler: data => { 
            this.doFinishPlenumMode(); 
          }
        },
        {
          text: 'Whateva, I got bored...',
          cssClass: 'button-md my-alert-button failed',
        }
      ]
    });
    alert.present();
  }

  doFinishPlenumMode() {
    // addTransactions for all the auction tasks
    this.stateProvider.iterateToNextWeek();
  }

  onSubmit() {
    if(this.settingsForm.valid) {
      this.stateProvider.updateSettings(this.settingsForm.value);
    }
  }
}
