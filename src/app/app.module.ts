import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { ControlPage } from '../pages/control/control';
import { ControlPageModule } from '../pages/control/control.module';
import { AuctionPage } from '../pages/auction/auction';
import { LunchPage } from '../pages/lunch/lunch';
import { LunchPageModule } from '../pages/lunch/lunch.module';
import { DinnerPage } from '../pages/dinner/dinner';
import { DinnerPageModule } from '../pages/dinner/dinner.module';
import { BidModalPageModule } from '../pages/bid-modal/bid-modal.module';
import { BidModalPage } from '../pages/bid-modal/bid-modal';
import { TaskEditModalPage } from '../pages/task-edit-modal/task-edit-modal';
import { TaskEditModalPageModule } from '../pages/task-edit-modal/task-edit-modal.module';
import { UserModalPage } from '../pages/user-modal/user-modal';
import { UserModalPageModule } from '../pages/user-modal/user-modal.module';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { DashboardPageModule } from '../pages/dashboard/dashboard.module';
import { DogPage } from '../pages/dog/dog';
import { DogPageModule } from '../pages/dog/dog.module';

import { UserInfoDisplay, UserInfoDisplayModule } from '../components/userInfoDisplay/userInfoDisplay';
import { UserSelectorComponent, UserSelectorComponentModule } from '../components/user-selector/user-selector';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { StateProvider } from '../providers/state/state';
import { DashboardProvider } from '../providers/dashboard/dashboard';
import { ConfigProvider } from '../providers/config/config';

@NgModule({
  declarations: [
    MyApp,
    AuctionPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    BidModalPageModule,
    DashboardPageModule,
    LunchPageModule,
    DinnerPageModule,
    TaskEditModalPageModule,
    UserModalPageModule,
    UserInfoDisplayModule,
    UserSelectorComponentModule,
    ControlPageModule,
    DogPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ControlPage,
    AuctionPage,
    DinnerPage,
    LunchPage,
    DogPage,
    BidModalPage,
    TaskEditModalPage,
    UserModalPage,
    DashboardPage,
    UserInfoDisplay,
    UserSelectorComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StateProvider,
    DashboardProvider,
    ConfigProvider
  ]
})
export class AppModule {}
