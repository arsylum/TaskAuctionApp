import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { StateProvider } from '../../providers/state/state';

/**
 * Generated class for the DogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dog',
  templateUrl: 'dog.html',
})
export class DogPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
  public stateProvider: StateProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DogPage');
  }

  addAssignee(e, user, task) {
    console.log('adding that person: ', user);
    console.log(e, task)
    this.stateProvider.takeDog(task.id, user.id);
  }

}
