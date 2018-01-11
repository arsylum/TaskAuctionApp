import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardProvider} from '../../providers/dashboard/dashboard';
import { StateProvider } from '../../providers/state/state';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  users;
  average;


  constructor(
  public navCtrl: NavController,
  public navParams: NavParams,
  public dashboardProvider: DashboardProvider,
  public stateProvider: StateProvider) {
    // this.dashboardProvider = dashboardProvider;
    // this.stateProvider = stateProvider;
    console.log(this);
  }

  getUsers() {
    return this.dashboardProvider.users;
  }

  getAverage() {
    return this.dashboardProvider.average;
  }

  getThClass(str) {
    if(this.dashboardProvider.current_sort === str
    || this.dashboardProvider.current_sort === str + '_inv') {
      return 'active';
    } else { return null; }
  }
  getRowClass(user) {
    return (user.id === this.stateProvider.uid ? 'active-user' : '');
  }

  // getCurrentGainOf(user) {
  //   return this.stateProvider.getUserCurrentGain(parseInt(user.id));
  // }
  percent(x) {
    return (x * 100).toFixed(1) + '%';
  }

  getCurrentUser() {
    for (let user of this.dashboardProvider.users) {
      if (user.id == this.stateProvider.uid) {
        return user;
      }
    }
    return {name: '', points_avg_lastoneweek: '', points_avg_lastfourweeks: '', points_avg_alltime: ''};  
  }
}
