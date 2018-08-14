import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';
import * as $ from 'jquery';
import 'rxjs/add/operator/map';
import { ConfigProvider } from '../config/config';

@Injectable()
export class StateProvider {

	private backEndUrl: string;
	public ready: boolean;
  public settings: any;
	public tasks: any;
	public users: any;
	public user: any;
	public uid: number;
  public user_current_gain: number;
  public user_current_auction_gain: number;
  public user_current_spont_gain: number;
  public user_current_dinner_gain: number;
  public user_current_dog_gain: number;
	private fireWhenReady: any;
  private loader;
  private refreshT;

  constructor(
  public loadingCtrl: LoadingController,
  private toastCtrl: ToastController,
  private configProvider: ConfigProvider
	) {
    this.ready = false;
    this.tasks = { auction: [], dinner: [], spontaneous: []};
    this.settings = {};
    this.user = { name: '', favtasks: []};
    this.uid = parseInt(localStorage.getItem('uid'));
    this.fireWhenReady = [];
    this.backEndUrl = this.configProvider.backEndUrl;
    this.refreshT = 0;

    this.user_current_gain = 0;
    this.user_current_auction_gain = 0;
    this.user_current_spont_gain = 0;
    this.user_current_dinner_gain = 0;
    this.user_current_dog_gain = 0;

    this.getState();
    // this.spawn_flake(); // WiNteR YaY!
  }

  ///////////////
  /// SNOW
  rand(n) {
    return (Math.floor(Math.random() * n+0.99999) );
  }

  spawn_flake() {
    var flake = $(new Image()),
        that = this;

    flake.on('load', function() {
      $('body').append(flake);
      flake.animate({"top": "110%"}, (that.rand(5666) + 4333 ), 'linear', function() {
        flake.remove();
      });

    });

    flake.addClass('star').attr('alt', '*')
      .css('left', this.rand(99)+"%")
      .css('top', "-10%")
      .css('width', (this.rand(84) + 5) + 'px')
      .attr('src', 'assets/img/star_'+this.rand(3)+'.png');

    setTimeout(function() { that.spawn_flake.call(that); }, this.rand(1337) + 50);
  }

  /// /SNOW
  /////////////////////

  refreshTimeout() {
    clearTimeout(this.refreshT);
    this.refreshT = setTimeout(() => {
      if(!document.hidden) { 
        this.getState.call(this);
      } else { 
        this.refreshTimeout(); 
      }
    }, 45000);
  }

  loading(msg?) {
    if(msg === undefined) { 
      msg = "Data intercourse..."; 
    }
    
    this.loader = this.loadingCtrl.create({
      content: msg
    });
    
    this.loader.present();
  }

  showError(msg) {
    this.showMsg('error',msg);
  }
  
  showSuccess(msg) {
    this.showMsg('success', msg);
  }
  
  showMsg(cssclass, msg) {
    let toast = this.toastCtrl.create({
        message: msg,
        duration: 2700,
        position: 'top',
        cssClass:cssclass
      }); 
    toast.present();
  }

  showMessages(msg, that) {
    if (msg.suc.length) {
      for(let i in msg.suc) {
        that.showSuccess(msg.suc[i]); 
      } 
    }
    
    if (msg.err.length) {
      for(let i in msg.err) {
        that.showError(msg.err[i]); 
      }
    }
  }

  getState() {
  	$.post(this.backEndUrl, {action: 'get_state'}).done(data => {
      this.setState(data, this);
	  	this.selectUser();
  	});
  }

  setState(data, that) {
    if(typeof data === 'string') {
      data = JSON.parse(data); 
    }
    
    that.showMessages(data.messages, that);
    that.settings = data.settings;
    that.tasks = data.tasks;
    that.users = this.sortUsers(data.users);
    that.ready = true;
    that.selectUser();
    
    if(that.loader !== undefined) { 
      that.loader.dismiss(); 
    }

    console.log('state updated: ', that); // very handy for state model inspection
    that.refreshTimeout();
  }

  sortUsers(users) { // by points, descending
    return users.sort((a,b) => { return parseInt(b.points) - parseInt(a.points); });
  }

  updateAuctionState(k:number) {
    this.loading();
    $.post(this.backEndUrl, {
      action: 'update_auctionState',
      newState: k
    }).done(data => { this.setState(data, this); });
  }

  isValidUser(){
    return (this.getUser(this.uid) !== undefined);
  }

  selectUser(i?:number) {
    if(i !== undefined) { this.uid = i; }
  	if(this.getUser(this.uid) === undefined) {
      // TODO
      console.warn('unknown user!');
  	} else {
  		this.user = this.getUser(this.uid);
      this.user_current_gain = this.getUserCurrentGain();
  		localStorage.setItem('uid', this.uid.toString());
  	}
  }

  getUser(id) {
    return this.users.filter((u) => {
      return parseInt(u.id) === parseInt(id);
    })[0];
  }

  getUserName(id) {
    let user = this.getUser(id);
    if(user === undefined) {
      user = { name: '%missingNo%'};
    } return user.name;
  }

  getUserCurrentGain(uid?: number) {
    if(uid === undefined) { uid = this.uid; }
    let auctionBal = 0,
        spontBal = 0,
        dinnerBal = 0,
        dogBal = 0, i, j, p;
        
    i = this.tasks.auction.length;
    while(i--) { 
      j = this.tasks.auction[i].winners.length;
      p = parseInt(this.tasks.auction[i].bid) / j;
      while(j--) { 
        if(this.tasks.auction[i].winners[j] === uid) { 
          auctionBal += p; 
        }
      }
    }

    i = this.tasks.spontaneous.length;
    while(i--) {
      j = this.tasks.spontaneous[i].winners.length;
      p = parseInt(this.tasks.spontaneous[i].fixed_value);
      while(j--) {
        if(this.tasks.spontaneous[i].winners[j] === uid) { 
          spontBal += p;  
        } 
      }
    }

    i = this.tasks.dinner.length;
    while(i--) {
      j = this.tasks.dinner[i].winners.length;
      p = parseInt(this.settings.dinner_value);
      while(j--) { 
        if(this.tasks.dinner[i].winners[j] === uid) { 
          dinnerBal += p;  
        } 
      }
    }

    i = this.tasks.dog.length;
    while(i--) {
      j = this.tasks.dog[i].winners.length;
      p = parseInt(this.settings.dog_value) / j; 
      while(j--) {
        if(this.tasks.dog[i].winners[j] === uid) {
          dogBal += p;
        }
      }
    }

    this.user_current_auction_gain = auctionBal;
    this.user_current_spont_gain = spontBal;
    this.user_current_dinner_gain = dinnerBal;
    this.user_current_dog_gain = dogBal;

    return auctionBal + spontBal + dinnerBal + dogBal;
  }

  addUser(name: string, callback: Function) {
    this.loading();
    $.post(this.backEndUrl, {
      action: 'add_user',
      name: name
    }).done(data => { 
      this.setState(data, this); 
      let user = this.users.filter((u) => {
        return u.name === name;
      })[0];
      // this.uid = parseInt(this.users.filter((u) => {
      //   return u.name === name;
      // })[0].id);
      // this.selectUser();
      if(callback !== undefined) {
        callback.call(undefined, user);
      }
    });
  }

  getTaskName(tid) {
    if(tid === null) {
      return '<@custom>'; 
    }
    for(let k in this.tasks) { 
      if(this.tasks.hasOwnProperty(k)){
        for(let i in this.tasks[k]) {
          if(this.tasks[k][i].id == tid) { 
            return this.tasks[k][i].name; 
          }
        }
      }
    }
  }

  // css class for freestyling
  getTaskClasses(task) {
    let classes = task.status;
    if(task.winners.length < 1 && task.status === null) { classes += ' available'; }
    return classes;
  }

  addTask(task) {
    this.loading();
    $.post(this.backEndUrl, { 
      action: 'add_task',
      name: task.name,
      description: task.description,
      type: task.type
    }).done(data => { this.setState(data, this); });
  }

  
  editTask(task) {
    //TODO the interval stuff?
    this.loading();
    $.post(this.backEndUrl, {
      action: 'edit_task',
      id: task.id,
      name: task.name,
      description: task.description,
      type: task.type,
      fixed_value: task.fixed_value
    }).done(data => { this.setState(data, this); });
  }

  deleteTask(taskId) {
    this.loading();
    $.post(this.backEndUrl, {
      action: 'delete_task',
      id: taskId
    }).done(data => { this.setState(data, this); });
  }

  undeleteTask(taskId) {
    this.loading();
    $.post(this.backEndUrl, {
      action: 'undelete_task',
      id: taskId
    }).done(data => { this.setState(data, this); });
  }

  updateTaskStatus(task) {
    this.loading();
    $.post(this.backEndUrl, {
      action: 'update_task_status',
      id: task.id,
      status: task.status
    }).done(data => { this.setState(data, this); });
  }

  newAuctionBid(task) {
    this.loading();
    $.post(this.backEndUrl, {
      action: 'new_bid',
      task_id: task.id,
      uid: this.uid,
      points: task.bid
    }).done(data => { this.setState(data, this); });
  }
  
  collabOn(task) {
    this.loading();
    $.post(this.backEndUrl, {
      action: 'collab',
      task_id: task.id,
      uid: this.uid,
      points: task.min

    }).done(data => { this.setState(data, this); });
  }  


  // deprecated, do not use
  submitDinnerClaim(task, join: boolean) {
    this.loading();
    let action = (join ? 'dinner_join' : 'dinner_take');
    $.post(this.backEndUrl, {
      action: action,
      task_id: task.id,
      uid: this.uid
    }).done(data => { this.setState(data, this); });

  }
  // for new assignment list mode
  submitDinnerAssign(tid, uid) {
    this.loading();
    $.post(this.backEndUrl, {
      action: 'dinner_join',
      task_id: tid,
      uid: uid
    }).done(data => { this.setState(data, this); });
  }

  abandonDinner(task, uid) {
    console.log(task, uid);
    if(uid === undefined) { uid = this.uid; }
    this.loading();
    $.post(this.backEndUrl, {
      action: 'dinner_bail',
      task_id: task.id,
      uid: uid
    }).done(data => { this.setState(data, this); });
  }

  takeDog(tid, uid) {
    this.loading();
    $.post(this.backEndUrl, {
      action: 'dog_join',
      task_id: tid,
      uid: uid
    }).done(data => { this.setState(data, this); });
  }
  abandonDog(task,uid) {
    console.log(task, uid);
    if(uid === undefined) { uid = this.uid; }
    this.loading();
    $.post(this.backEndUrl, {
      action: 'dog_bail',
      task_id: task.id,
      uid: uid
    }).done(data => { this.setState(data, this); });
  }

  spontClaim(task) { this.spontClaimUpdate(task, false, undefined);  }
  spontDisclaim(task){ this.spontClaimUpdate(task,true, undefined); }
  spontClaimUpdate(task, remove, uid) {
    let action = (remove ? 'spont_bail' : 'spont_take');
    if (uid === undefined) { uid = this.uid; }
    this.loading();
    $.post(this.backEndUrl, {
      action: action,
      task_id: task.id,
      uid: uid
    }).done(data => { this.setState(data, this); });
  }

  addTransaction(task_id, points, comment) {
    this.loading();
    $.post(this.backEndUrl, {
      action: 'add_transaction',
      uid: this.uid,
      task_id: task_id,
      points: points,
      comment: comment
    }).done(data => { this.setState(data, this); });
  }

  iterateToNextWeek() {
    this.loading('Calculating <strong>looong</strong> and <strong>hard</strong>...');
    $.post(this.backEndUrl, {
      action: 'iterate_to_next_week'
    }).done(data => { this.setState(data, this); });
  }

  updateSettings(values) {
    this.loading();
    $.post(this.backEndUrl, {
      action: 'update_settings',
      closing_time: values.closingTime,
      dinner_value: values.dinnerValue,
      dog_value: values.dogValue
    }).done(data => { this.setState(data, this); });
  }
}
