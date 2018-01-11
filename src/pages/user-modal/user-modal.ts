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
	  this.users = this.stateProvider.users;
    this.transactions = this.stateProvider.user.transactions;
    this.searchstr = this.stateProvider.user.name;
    this.filterList();
  }

  clearInput() {
    this.searchstr = '';
    this.filterList();
  }

  selectUser() {
  	if(this.users.length === 1) {
  		this.userSelected = true;
      this.stateProvider.uid = parseInt(this.users[0].id);
      this.stateProvider.selectUser();

  	} else { 
      this.userSelected = false; 
      setTimeout(() => {
        let el = $('.searchbar .searchbar-input').get(0);
        if(el !== undefined) {
          el.focus();
        }
      },5);
    } 
  }

  filterList() {
  	this.users = this.stateProvider.users;
  	let val = this.searchstr;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.users = this.users.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    this.selectUser();
  }

  selectEntry(ev:any, user: any) {
  	this.searchstr = user.name;
  	this.filterList();
  }
  
  createUser() {
    this.stateProvider.addUser(this.searchstr);
    this.viewCtrl.dismiss();
  }

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
