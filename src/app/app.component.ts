import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ControlPage } from '../pages/control/control';
import { AuctionPage } from '../pages/auction/auction';
import { LunchPage } from '../pages/lunch/lunch';
import { DinnerPage } from '../pages/dinner/dinner';
import { DashboardPage } from '../pages/dashboard/dashboard';
// import { DogPage } from '../pages/dog/dog';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = AuctionPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Auction', component: AuctionPage },
      { title: 'Lunch', component: LunchPage },
      { title: 'Dinner', component: DinnerPage },
      // { title: 'Dog', component: DogPage },
      { title: 'Control Room', component: ControlPage },
      { title: 'Dashboard', component: DashboardPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
