import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { StateProvider } from '../../providers/state/state';
import * as $ from 'jquery';

@IonicPage()
@Component({
  selector: 'page-user-modal',
  templateUrl: 'user-modal.html',
})
export class UserModalPage {
	users;
  transactions;
	searchstr: string;
  deltapoints: string;
  deltareason: string;
	userSelected: boolean;

  constructor(
  public navCtrl: NavController,
  public navParams: NavParams, 
  public stateProvider: StateProvider,
  public viewCtrl: ViewController,
  ) {
	  this.users = [this.stateProvider.user];
    this.transactions = this.stateProvider.user.transactions;
    // this.searchstr = this.stateProvider.user.name;
    // this.filterList();
    this.userSelected = true;
  }


  selectEntry(ev:any, user: any) {
    this.stateProvider.uid = parseInt(user.id);
    this.stateProvider.selectUser();
    this.userSelected = true;
    // this.users = [this.stateProvider.user];
  }
  
  // createUser() {
  //   this.stateProvider.addUser(this.searchstr);
  //   this.viewCtrl.dismiss();
  // }

  allocatePoints(factor) {
    let points = parseFloat(this.deltapoints) * factor;
    if(isNaN(points)) { 
      this.stateProvider.showError('You call that a number?!');
      return false;
    }
    if(this.deltareason === undefined || !this.deltareason.length) {
      this.stateProvider.showError('Give me one good reason!'); 
      return false;
    }

    this.stateProvider.addTransaction(null, points, this.deltareason);

    this.deltapoints = '';
    this.deltareason = '';
  }
}
