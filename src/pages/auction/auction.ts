import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { StateProvider } from '../../providers/state/state';
import { BidModalPage } from '../bid-modal/bid-modal';
import { TaskEditModalPage } from '../task-edit-modal/task-edit-modal';

@Component({
  selector: 'page-auction',
  templateUrl: 'auction.html'
})
export class AuctionPage {
  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams, 
  public alertCtrl: AlertController, 
  private stateProvider: StateProvider, 
  private modalCtrl: ModalController) {
  }

  userTasks() {
    //should return all auction tasks currently won or assigned to user

    return this.stateProvider.tasks.auction.filter(task => { 
      for(let winner in task.winners) {
        if(task.winners[winner] === this.stateProvider.uid) { 
          return true; 
        }
      } return false;
    });
  }

  currentGain() {
    let ut = this.userTasks();
    let i = ut.length;
    let gain = 0;
    while(i--) {
      gain += Math.floor(ut[i].bid / ut[i].winners.length); 
    }
    return gain;
  }

  stolenTasks() {
    return this.stateProvider.tasks.auction.filter(task => {
      if(this.stateProvider.user.favtasks.indexOf(parseInt(task.id)) < 0) {
        return false;
      }
      for(let winner in task.winners) {
        if(task.winners.hasOwnProperty(winner)
        && task.winners[winner] === this.stateProvider.uid) { 
            return false; 
          } 
      } 
      return true;
    });
  }

  availableTasks() {
    //should return all auctions tasks currently not won or assigned to user
    return this.stateProvider.tasks.auction.filter(task => { 
      if(this.stateProvider.user.favtasks.indexOf(parseInt(task.id)) > -1) { 
        return false; 
      }
      
      for(let winner in task.winners) {
        if(task.winners.hasOwnProperty(winner)
        && task.winners[winner] === this.stateProvider.uid) { 
          return false; 
        } 
      } return true;
    });
  }

  taskClicked(event, task) {
    console.log(event.target);
    if(event.target.className.indexOf('badge-md-light') > -1) { return null; }
    if (this.stateProvider.settings.auctionState == 0
     || (this.stateProvider.settings.auctionState != 2 && task.type == 'spontaneous')) {
      const bidModal = this.modalCtrl.create(BidModalPage, { 'task' : task , type : task.type});
      bidModal.present();

    } else if (this.stateProvider.settings.auctionState == 1) {
      this.presentTaskCompletionPrompt(event, task);

    } else if (this.stateProvider.settings.auctionState == 2) {
      const taskEditModal = this.modalCtrl.create(TaskEditModalPage, { 'task' : task, 'type' : task.type, 'action' : 'edit' });
      taskEditModal.present();
    }
  }

  presentTaskCompletionPrompt(event, task) {
    const alert = this.alertCtrl.create({
      title: 'Update Status',
      subTitle: task.name,
      message: 'What\'s the status of this task?',
      buttons: [
        {
          text: 'Done',
          cssClass: 'button-md my-alert-button done',
          handler: data => { 
            task.status = 'done'; 
            this.stateProvider.updateTaskStatus(task); 
          }
        },
        { 
          text: 'No need to be done',
          cssClass: 'button-md my-alert-button irrelevant',
          handler: data => {
            task.status = 'irrelevant';
            this.stateProvider.updateTaskStatus(task);
          }
        },
        {
          text: 'Failed',
          cssClass: 'button-md my-alert-button failed',
          handler: data => {
            task.status = 'failed';
            this.stateProvider.updateTaskStatus(task);
          }
        },
        {
          text: 'We don\'t know! (Reset)',
          cssClass: 'button-md my-alert-button',
          handler: data => {
            task.status = null;
            this.stateProvider.updateTaskStatus(task);
          }
        },
        {
          text: '← Nevermind',
          cssClass: 'button-md my-alert-button button-md-light',
        }
      ]
    });
    alert.present();
  }
  
  presentAddTaskPrompt() {
      const taskEditModal = this.modalCtrl.create(TaskEditModalPage, { 'action' : 'add' });
      taskEditModal.present();
  }

} 
