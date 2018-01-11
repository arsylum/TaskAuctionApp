import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';
import { ConfigProvider } from '../config/config';
import { StateProvider } from '../state/state';

/*
  Generated class for the DashboardProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DashboardProvider {

  users;
  average;
  total;
  current_sort;

  private backEndUrl: string;

  constructor(private configProvider: ConfigProvider, private stateProvider: StateProvider) {
    this.backEndUrl = this.configProvider.backEndUrl;

    this.current_sort = '';
    this.users = [{ name: 'Initializing...' }];

    this.total = {current_gain: 0,
                  lastweek: 0,
                  avg_fourweeks: 0,
                  total: 0
                };
    this.average = {current_gain: 0,
                    lastweek: 0,
                    avg_fourweeks: 0,
                    total: 0
                  };

    var that = this;
    $.post(this.backEndUrl, {action: 'get_dashboard'}).done(data => {
      that.updateDashboard(data, that);
    });
  }


  sortUsers(by) {

    let dir = 'desc';
    if(this.current_sort === by) {
      dir = 'asc';                      // toggle between descending
      this.current_sort = by + '_inv';  // and ascending
    } else { this.current_sort = by; }

    if(!/current_gain|points_lastweek|points_avg_fourweeks|points/.test(by)) { return false; }

    if(dir === 'desc') { this.users.sort(function(a,b) { return b[by] - a[by]; }) }
    else if(dir === 'asc') { this.users.sort(function(a,b) { return a[by] - b[by]; }) }  

  }

  updateDashboard(data, that) {
    if(typeof data === 'string') {
      data = JSON.parse(data);
      this.users = data;
      // console.log(data);

      let totcur = 0,
          totcurc = 0,
          tot1w = 0,
          tot1wc = 0,
          tot4w = 0,
          tot4wc = 0,
          tottot = 0,
          tottotc = 0;

      let i = this.users.length;
      while(i--) {
        this.users[i].current_gain = this.stateProvider.getUserCurrentGain(this.users[i].id);
        if(this.users[i].current_gain === 0) { this.users[i].current_gain = null; }
        else {
          totcur += this.users[i].current_gain;
          totcurc++;
        }

        if(this.users[i].points_lastweek !== null) {
          this.users[i].points_lastweek = parseFloat(this.users[i].points_lastweek);
          tot1w += this.users[i].points_lastweek;
          tot1wc++;
        }
        if(this.users[i].points_avg_fourweeks !== null) {
          this.users[i].points_avg_fourweeks = parseFloat(this.users[i].points_avg_fourweeks);
          tot4w += this.users[i].points_avg_fourweeks;
          tot4wc++;
        }
        if(this.users[i].points > 0) {
          tottot += this.users[i].points;
          tottotc++;
        }
      }

      this.total.current_gain = totcur;
      this.total.lastweek = tot1w;
      this.total.avg_fourweeks = tot4w;
      this.total.total = tottot;

      this.average.current_gain = totcur / totcurc;
      this.average.lastweek = tot1w / tot1wc;
      this.average.avg_fourweeks = tot4w / tot4wc;
      this.average.total = tottot / tottotc;

      i = this.users.length; // loop 1 more time and calculate relative amouns
      while(i--) {
        this.users[i].current_gain_rel = this.users[i].current_gain / totcur;
        this.users[i].points_lastweek_rel = this.users[i].points_lastweek / tot1w;
        this.users[i].points_avg_fourweeks_rel = this.users[i].points_avg_fourweeks / tot4w;
        this.users[i].points_rel = this.users[i].points / tottot;
      }

      this.sortUsers('current_gain');
    }
  }
}
