import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { ControlPage } from '../pages/control/control';
import { ControlPageModule } from '../pages/control/control.module';
import { AuctionPage } from '../pages/auction/auction';
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

import { UserInfoDisplay, UserInfoDisplayModule } from '../components/userInfoDisplay/userInfoDisplay';

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
    DinnerPageModule,
    TaskEditModalPageModule,
    UserModalPageModule,
    UserInfoDisplayModule,
    ControlPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ControlPage,
    AuctionPage,
    DinnerPage,
    BidModalPage,
    TaskEditModalPage,
    UserModalPage,
    DashboardPage,
    UserInfoDisplay,
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
