import { Component, NgModule, Input } from '@angular/core';
import { StateProvider } from '../../providers/state/state';
import { IonicModule } from 'ionic-angular';

/**
 * Generated class for the UserSelectorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'user-selector',
  templateUrl: 'user-selector.html'
})
export class UserSelectorComponent {

  text: string;
  users;
  searchstr: string;
  engaged: boolean;
  container;
  @Input() placeholder: string;
  @Input() entryClickCallback: Function; 
  @Input() that: any;
  @Input() task: any;


  constructor(
  public stateProvider: StateProvider,
  ) {
		this.searchstr = '';
	  this.users = this.stateProvider.users;
	  this.engaged = false;
    // this.searchstr = this.stateProvider.user.name;
    this.filterList();
  }

  // on focus
  engage(e: any) {
  	var that =  this;
  	this.engaged = true;
  	this.container = e.target.parentElement.parentElement.parentElement;
  	e.target.tabIndex = 1;
  	document.addEventListener('mousedown',function clickOut(e: any) {

  		if(e.path.indexOf(that.container) < 0) {
  			document.removeEventListener('mousedown', clickOut);
  			that.engaged = false;
  		}
  	});
  }

  /// keyup on searchbar-input
  keyup(e:any) {
  	if(e.keyCode === 13 && this.users.length > 0) {
  		this.selectEntry(e,this.users[0]);
  		this.engaged = false;
  		let aE = document.activeElement;
      if(aE instanceof HTMLElement) { aE.blur(); }
  	}
  }

  clearInput() {
    this.searchstr = '';
    this.filterList();
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
    // this.selectUser();
  }

  selectEntry(ev:any, user: any) {
    // console.log(this.task);
  	this.entryClickCallback.call(this.that, ev, user, this.task);

    this.searchstr = '';
    this.engaged = false;
    this.filterList();

  }
  // keyup on dropdown entry
  keyEntry(ev:any, user:any) {
  	if(ev.keyCode === 13) {
  		this.selectEntry(ev, user);
  	}
  }
  
  createUser() {
  	var that = this;
    this.stateProvider.addUser(this.searchstr, function(user) {
    	that.entryClickCallback.call(that.that, undefined, user);
    // this.viewCtrl.dismiss();
  	});
  	this.searchstr = '';
  	this.engaged = false;
  	this.filterList();
  }


}

@NgModule({
	declarations: [UserSelectorComponent,],
	imports: [IonicModule,],
	exports: [UserSelectorComponent,],
	entryComponents: [ UserSelectorComponent, ]
})
export class UserSelectorComponentModule {}