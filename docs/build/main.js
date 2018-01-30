webpackJsonp([0],{

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ControlPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_state_state__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ControlPage = (function () {
    function ControlPage(navCtrl, stateProvider, alertCtrl, formBuilder) {
        this.navCtrl = navCtrl;
        this.stateProvider = stateProvider;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.inMaintenanceMode = stateProvider.settings.auctionState == 2;
        this.settingsForm = formBuilder.group({
            closingTime: [stateProvider.settings.closing_time, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('(Mon|Tue|Wed|Thu|Fri|Sat|Sun) ([01][0-9]|2[0-3]):[0-5][0-9]')],
            dinnerValue: [stateProvider.settings.dinner_value, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('[0-9]+')],
        });
    }
    ControlPage.prototype.enableMaintenanceMode = function () {
        this.stateProvider.updateAuctionState(2);
    };
    ControlPage.prototype.disableMaintenanceMode = function () {
        this.stateProvider.updateAuctionState(null);
    };
    ControlPage.prototype.completionIsReady = function () {
        return !(this.readyTasks() < this.totalTasks());
    };
    ControlPage.prototype.totalTasks = function () {
        return this.stateProvider.tasks.auction.length;
    };
    ControlPage.prototype.readyTasks = function () {
        var i = this.stateProvider.tasks.auction.length, count = 0;
        while (i--) {
            if (this.stateProvider.tasks.auction[i].status !== null) {
                count++;
            }
        }
        return count;
    };
    ControlPage.prototype.finishPlenumMode = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Iterate week',
            subTitle: 'Finish the meeting',
            message: 'Calculate all the points',
            buttons: [
                {
                    text: 'Go for it!',
                    cssClass: 'button-md my-alert-button done',
                    handler: function (data) {
                        _this.confirmDinners();
                    }
                },
                {
                    text: 'Hold on',
                    cssClass: 'button-md my-alert-button failed',
                }
            ]
        });
        alert.present();
    };
    ControlPage.prototype.confirmDinners = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Dinners?',
            subTitle: 'Did you eat?',
            message: 'Did they happen as listed on the dinners page?',
            buttons: [
                {
                    text: 'Sure did!',
                    cssClass: 'button-md my-alert-button done',
                    handler: function (data) {
                        _this.confirmTasks();
                    }
                },
                {
                    text: 'What, dinners?',
                    cssClass: 'button-md my-alert-button failed',
                }
            ]
        });
        alert.present();
    };
    ControlPage.prototype.confirmTasks = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'All good?',
            subTitle: 'Checking the tasks.',
            message: 'Did you confirm all the auction tasks have the correct status and all listed spontaneous tasks got done?',
            buttons: [
                {
                    text: 'Erm...yes, for course!',
                    cssClass: 'button-md my-alert-button done',
                    handler: function (data) {
                        _this.confirmFinishPlenumMode();
                    }
                },
                {
                    text: 'There was cake? WHAAAT?',
                    cssClass: 'button-md my-alert-button failed',
                }
            ]
        });
        alert.present();
    };
    ControlPage.prototype.confirmFinishPlenumMode = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Are you sure?',
            subTitle: 'This step is non-reversible.',
            message: 'Missuse will load the hatred of the catministrator upon you!',
            buttons: [
                {
                    text: 'I am not afraid!',
                    cssClass: 'button-md my-alert-button done',
                    handler: function (data) {
                        _this.finalConfirmFinishPlenumMode();
                    }
                },
                {
                    text: 'okaaay, nevermind',
                    cssClass: 'button-md my-alert-button failed',
                }
            ]
        });
        alert.present();
    };
    ControlPage.prototype.finalConfirmFinishPlenumMode = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Just kidding',
            subTitle: 'That previous step was still reversible.',
            message: 'But this one ain\'t, I\'m seriously serious!',
            buttons: [
                {
                    text: 'Crunch data!',
                    cssClass: 'button-md my-alert-button done',
                    handler: function (data) {
                        _this.doFinishPlenumMode();
                    }
                },
                {
                    text: 'Whateva, I got bored...',
                    cssClass: 'button-md my-alert-button failed',
                }
            ]
        });
        alert.present();
    };
    ControlPage.prototype.doFinishPlenumMode = function () {
        // addTransactions for all the auction tasks
        this.stateProvider.iterateToNextWeek();
    };
    ControlPage.prototype.onSubmit = function () {
        if (this.settingsForm.valid) {
            this.stateProvider.updateSettings(this.settingsForm.value);
        }
    };
    return ControlPage;
}());
ControlPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-control',template:/*ion-inline-start:"/home/shsk/TaskAuctionApp/src/pages/control/control.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <user-info-display></user-info-display>\n    <ion-title>Admin</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-card><ion-card-header>Maintenance Mode</ion-card-header>\n    <ion-card-content>\n      <p>(Some features of maintenance mode are missing!)</p>\n      <h3>Edit/Add/Delete Tasks\n        <ion-badge *ngIf="stateProvider.settings.auctionState != 2" color="light">Maintenance Mode is off</ion-badge>\n        <ion-badge *ngIf="stateProvider.settings.auctionState == 2">Maintenance Mode is on</ion-badge>\n      </h3>\n\n      <div *ngIf="stateProvider.settings.auctionState != 2">\n        <button ion-button secondary (click)="enableMaintenanceMode()" >Enable Maintenance Mode</button>\n      </div>\n      <div *ngIf="stateProvider.settings.auctionState == 2">\n        <button ion-button secondary (click)="disableMaintenanceMode()">Disable Maintenance Mode</button>\n      </div>\n    </ion-card-content>\n  </ion-card>\n\n  <ion-card><ion-card-header>Plenum <h3>Distribute those points!</h3></ion-card-header>\n    <ion-card-content>\n      <ion-badge color="danger" *ngIf="!completionIsReady()"> Only {{ readyTasks() }} / {{ totalTasks() }} auction tasks are confirmed.</ion-badge>\n      <ion-badge color="secondary" *ngIf="completionIsReady()">Ready to move on!</ion-badge>\n      <br>\n      <button ion-button secondary (click)="finishPlenumMode()" [disabled]="!completionIsReady()">Progress to next week</button>\n    </ion-card-content>\n  </ion-card>\n  <ion-card><ion-card-header>Settings</ion-card-header>\n    <ion-card-content>\n      <form [formGroup]="settingsForm" (ngSubmit)="onSubmit(settingsForm.value)">\n        <ion-item>\n          <ion-label floating>Closing Time</ion-label>\n          <ion-input formControlName="closingTime" type="text"></ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-label floating>Dinner Value</ion-label>\n          <ion-input formControlName="dinnerValue" type="number"></ion-input>\n        </ion-item>\n      </form>\n      <button ion-button secondary [disabled]="!settingsForm.valid" type="submit" (click)="onSubmit()">Submit</button>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/home/shsk/TaskAuctionApp/src/pages/control/control.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_state_state__["a" /* StateProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */]])
], ControlPage);

//# sourceMappingURL=control.js.map

/***/ }),

/***/ 119:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 119;

/***/ }),

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/bid-modal/bid-modal.module": [
		165
	],
	"../pages/dashboard/dashboard.module": [
		161
	],
	"../pages/dinner/dinner.module": [
		164
	],
	"../pages/task-edit-modal/task-edit-modal.module": [
		166
	],
	"../pages/user-modal/user-modal.module": [
		167
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 160;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardPageModule", function() { return DashboardPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_userInfoDisplay_userInfoDisplay__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var DashboardPageModule = (function () {
    function DashboardPageModule() {
    }
    return DashboardPageModule;
}());
DashboardPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__dashboard__["a" /* DashboardPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__dashboard__["a" /* DashboardPage */]),
            __WEBPACK_IMPORTED_MODULE_3__components_userInfoDisplay_userInfoDisplay__["b" /* UserInfoDisplayModule */],
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__components_userInfoDisplay_userInfoDisplay__["a" /* UserInfoDisplay */],
        ]
    })
], DashboardPageModule);

//# sourceMappingURL=dashboard.module.js.map

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_config__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__state_state__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the DashboardProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var DashboardProvider = (function () {
    function DashboardProvider(configProvider, stateProvider) {
        this.configProvider = configProvider;
        this.stateProvider = stateProvider;
        this.backEndUrl = this.configProvider.backEndUrl;
        this.current_sort = '';
        this.users = [{ name: 'Initializing...' }];
        this.total = { current_gain: 0,
            lastweek: 0,
            avg_fourweeks: 0,
            total: 0
        };
        this.average = { current_gain: 0,
            lastweek: 0,
            avg_fourweeks: 0,
            total: 0
        };
        var that = this;
        __WEBPACK_IMPORTED_MODULE_2_jquery__["post"](this.backEndUrl, { action: 'get_dashboard' }).done(function (data) {
            that.updateDashboard(data, that);
        });
    }
    DashboardProvider.prototype.sortUsers = function (by) {
        var dir = 'desc';
        if (this.current_sort === by) {
            dir = 'asc'; // toggle between descending
            this.current_sort = by + '_inv'; // and ascending
        }
        else {
            this.current_sort = by;
        }
        if (!/current_gain|points_lastweek|points_avg_fourweeks|points/.test(by)) {
            return false;
        }
        if (dir === 'desc') {
            this.users.sort(function (a, b) { return b[by] - a[by]; });
        }
        else if (dir === 'asc') {
            this.users.sort(function (a, b) { return a[by] - b[by]; });
        }
    };
    DashboardProvider.prototype.updateDashboard = function (data, that) {
        if (typeof data === 'string') {
            data = JSON.parse(data);
            this.users = data;
            // console.log(data);
            var totcur = 0, totcurc = 0, tot1w = 0, tot1wc = 0, tot4w = 0, tot4wc = 0, tottot = 0, tottotc = 0;
            var i = this.users.length;
            while (i--) {
                this.users[i].current_gain = this.stateProvider.getUserCurrentGain(this.users[i].id);
                if (this.users[i].current_gain === 0) {
                    this.users[i].current_gain = null;
                }
                else {
                    totcur += this.users[i].current_gain;
                    totcurc++;
                }
                if (this.users[i].points_lastweek !== null) {
                    this.users[i].points_lastweek = parseFloat(this.users[i].points_lastweek);
                    tot1w += this.users[i].points_lastweek;
                    tot1wc++;
                }
                if (this.users[i].points_avg_fourweeks !== null) {
                    this.users[i].points_avg_fourweeks = parseFloat(this.users[i].points_avg_fourweeks);
                    tot4w += this.users[i].points_avg_fourweeks;
                    tot4wc++;
                }
                if (this.users[i].points > 0) {
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
            while (i--) {
                this.users[i].current_gain_rel = this.users[i].current_gain / totcur;
                this.users[i].points_lastweek_rel = this.users[i].points_lastweek / tot1w;
                this.users[i].points_avg_fourweeks_rel = this.users[i].points_avg_fourweeks / tot4w;
                this.users[i].points_rel = this.users[i].points / tottot;
            }
            this.sortUsers('current_gain');
        }
    };
    return DashboardProvider;
}());
DashboardProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__config_config__["a" /* ConfigProvider */], __WEBPACK_IMPORTED_MODULE_4__state_state__["a" /* StateProvider */]])
], DashboardProvider);

//# sourceMappingURL=dashboard.js.map

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DinnerPageModule", function() { return DinnerPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dinner__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_userInfoDisplay_userInfoDisplay__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var DinnerPageModule = (function () {
    function DinnerPageModule() {
    }
    return DinnerPageModule;
}());
DinnerPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__dinner__["a" /* DinnerPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__dinner__["a" /* DinnerPage */]),
            __WEBPACK_IMPORTED_MODULE_3__components_userInfoDisplay_userInfoDisplay__["b" /* UserInfoDisplayModule */],
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__components_userInfoDisplay_userInfoDisplay__["a" /* UserInfoDisplay */],
        ]
    })
], DinnerPageModule);

//# sourceMappingURL=dinner.module.js.map

/***/ }),

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BidModalPageModule", function() { return BidModalPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bid_modal__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_userInfoDisplay_userInfoDisplay__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var BidModalPageModule = (function () {
    function BidModalPageModule() {
    }
    return BidModalPageModule;
}());
BidModalPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__bid_modal__["a" /* BidModalPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__bid_modal__["a" /* BidModalPage */]),
            __WEBPACK_IMPORTED_MODULE_3__components_userInfoDisplay_userInfoDisplay__["b" /* UserInfoDisplayModule */],
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__components_userInfoDisplay_userInfoDisplay__["a" /* UserInfoDisplay */],
        ],
    })
], BidModalPageModule);

//# sourceMappingURL=bid-modal.module.js.map

/***/ }),

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskEditModalPageModule", function() { return TaskEditModalPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__task_edit_modal__ = __webpack_require__(87);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TaskEditModalPageModule = (function () {
    function TaskEditModalPageModule() {
    }
    return TaskEditModalPageModule;
}());
TaskEditModalPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__task_edit_modal__["a" /* TaskEditModalPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__task_edit_modal__["a" /* TaskEditModalPage */]),
        ],
    })
], TaskEditModalPageModule);

//# sourceMappingURL=task-edit-modal.module.js.map

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserModalPageModule", function() { return UserModalPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_modal__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var UserModalPageModule = (function () {
    function UserModalPageModule() {
    }
    return UserModalPageModule;
}());
UserModalPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__user_modal__["a" /* UserModalPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__user_modal__["a" /* UserModalPage */]),
        ],
    })
], UserModalPageModule);

//# sourceMappingURL=user-modal.module.js.map

/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StateProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config_config__ = __webpack_require__(85);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var StateProvider = (function () {
    function StateProvider(loadingCtrl, toastCtrl, configProvider) {
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.configProvider = configProvider;
        this.ready = false;
        this.tasks = { auction: [], dinner: [], spontaneous: [] };
        this.settings = {};
        this.user = { name: '', favtasks: [] };
        this.uid = parseInt(localStorage.getItem('uid'));
        this.fireWhenReady = [];
        this.backEndUrl = this.configProvider.backEndUrl;
        this.refreshT = 0;
        this.user_current_gain = 0;
        this.user_current_auction_gain = 0;
        this.user_current_spont_gain = 0;
        this.user_current_dinner_gain = 0;
        this.getState();
        // this.spawn_flake(); // WiNteR YaY!
    }
    ///////////////
    /// SNOW
    StateProvider.prototype.rand = function (n) {
        return (Math.floor(Math.random() * n + 0.99999));
    };
    StateProvider.prototype.spawn_flake = function () {
        var flake = __WEBPACK_IMPORTED_MODULE_2_jquery__(new Image()), that = this;
        flake.on('load', function () {
            __WEBPACK_IMPORTED_MODULE_2_jquery__('body').append(flake);
            flake.animate({ "top": "110%" }, (that.rand(5666) + 4333), 'linear', function () {
                flake.remove();
            });
        });
        flake.addClass('star').attr('alt', '*')
            .css('left', this.rand(99) + "%")
            .css('top', "-10%")
            .css('width', (this.rand(84) + 5) + 'px')
            .attr('src', 'assets/img/star_' + this.rand(3) + '.png');
        setTimeout(function () { that.spawn_flake.call(that); }, this.rand(1337) + 50);
    };
    /// /SNOW
    /////////////////////
    StateProvider.prototype.refreshTimeout = function () {
        var _this = this;
        clearTimeout(this.refreshT);
        this.refreshT = setTimeout(function () {
            if (!document.hidden) {
                _this.getState.call(_this);
            }
            else {
                _this.refreshTimeout();
            }
        }, 45000);
    };
    StateProvider.prototype.loading = function (msg) {
        if (msg === undefined) {
            msg = "Data intercourse...";
        }
        this.loader = this.loadingCtrl.create({
            content: msg
        });
        this.loader.present();
    };
    StateProvider.prototype.showError = function (msg) {
        this.showMsg('error', msg);
    };
    StateProvider.prototype.showSuccess = function (msg) {
        this.showMsg('success', msg);
    };
    StateProvider.prototype.showMsg = function (cssclass, msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 2700,
            position: 'top',
            cssClass: cssclass
        });
        toast.present();
    };
    StateProvider.prototype.showMessages = function (msg, that) {
        if (msg.suc.length) {
            for (var i in msg.suc) {
                that.showSuccess(msg.suc[i]);
            }
        }
        if (msg.err.length) {
            for (var i in msg.err) {
                that.showError(msg.err[i]);
            }
        }
    };
    StateProvider.prototype.getState = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_2_jquery__["post"](this.backEndUrl, { action: 'get_state' }).done(function (data) {
            _this.setState(data, _this);
            _this.selectUser();
        });
    };
    StateProvider.prototype.setState = function (data, that) {
        if (typeof data === 'string') {
            data = JSON.parse(data);
        }
        that.showMessages(data.messages, that);
        that.settings = data.settings;
        that.tasks = data.tasks;
        that.users = this.sortUsers(data.users);
        that.ready = true;
        that.selectUser();
        if (that.loader !== undefined) {
            that.loader.dismiss();
        }
        // console.log('state updated: ', that); // very handy for state model inspection
        that.refreshTimeout();
    };
    StateProvider.prototype.sortUsers = function (users) {
        return users.sort(function (a, b) { return parseInt(b.points) - parseInt(a.points); });
    };
    StateProvider.prototype.updateAuctionState = function (k) {
        var _this = this;
        this.loading();
        __WEBPACK_IMPORTED_MODULE_2_jquery__["post"](this.backEndUrl, {
            action: 'update_auctionState',
            newState: k
        }).done(function (data) { _this.setState(data, _this); });
    };
    StateProvider.prototype.isValidUser = function () {
        return (this.getUser(this.uid) !== undefined);
    };
    StateProvider.prototype.selectUser = function (i) {
        if (i !== undefined) {
            this.uid = i;
        }
        if (this.getUser(this.uid) === undefined) {
            // TODO
            console.warn('unknown user!');
        }
        else {
            this.user = this.getUser(this.uid);
            this.user_current_gain = this.getUserCurrentGain();
            localStorage.setItem('uid', this.uid.toString());
        }
    };
    StateProvider.prototype.getUser = function (id) {
        return this.users.filter(function (u) {
            return parseInt(u.id) === parseInt(id);
        })[0];
    };
    StateProvider.prototype.getUserName = function (id) {
        var user = this.getUser(id);
        if (user === undefined) {
            user = { name: '%missingNo%' };
        }
        return user.name;
    };
    StateProvider.prototype.getUserCurrentGain = function (uid) {
        if (uid === undefined) {
            uid = this.uid;
        }
        var auctionBal = 0, spontBal = 0, dinnerBal = 0, i, j, p;
        i = this.tasks.auction.length;
        while (i--) {
            j = this.tasks.auction[i].winners.length;
            p = parseInt(this.tasks.auction[i].bid) / j;
            while (j--) {
                if (this.tasks.auction[i].winners[j] === uid) {
                    auctionBal += p;
                }
            }
        }
        i = this.tasks.spontaneous.length;
        while (i--) {
            j = this.tasks.spontaneous[i].winners.length;
            p = parseInt(this.tasks.spontaneous[i].fixed_value);
            while (j--) {
                if (this.tasks.spontaneous[i].winners[j] === uid) {
                    spontBal += p;
                }
            }
        }
        i = this.tasks.dinner.length;
        while (i--) {
            j = this.tasks.dinner[i].winners.length;
            p = parseInt(this.settings.dinner_value);
            while (j--) {
                if (this.tasks.dinner[i].winners[j] === uid) {
                    dinnerBal += p;
                }
            }
        }
        this.user_current_auction_gain = auctionBal;
        this.user_current_spont_gain = spontBal;
        this.user_current_dinner_gain = dinnerBal;
        return auctionBal + spontBal + dinnerBal;
    };
    StateProvider.prototype.addUser = function (name) {
        var _this = this;
        this.loading();
        __WEBPACK_IMPORTED_MODULE_2_jquery__["post"](this.backEndUrl, {
            action: 'add_user',
            name: name
        }).done(function (data) {
            _this.setState(data, _this);
            _this.uid = parseInt(_this.users.filter(function (u) {
                return u.name === name;
            })[0].id);
            _this.selectUser();
        });
    };
    StateProvider.prototype.getTaskName = function (tid) {
        if (tid === null) {
            return '<@custom>';
        }
        for (var k in this.tasks) {
            if (this.tasks.hasOwnProperty(k)) {
                for (var i in this.tasks[k]) {
                    if (this.tasks[k][i].id == tid) {
                        return this.tasks[k][i].name;
                    }
                }
            }
        }
    };
    // css class for freestyling
    StateProvider.prototype.getTaskClasses = function (task) {
        var classes = task.status;
        if (task.winners.length < 1 && task.status === null) {
            classes += ' available';
        }
        return classes;
    };
    StateProvider.prototype.addTask = function (task) {
        var _this = this;
        this.loading();
        __WEBPACK_IMPORTED_MODULE_2_jquery__["post"](this.backEndUrl, {
            action: 'add_task',
            name: task.name,
            description: task.description,
            type: task.type
        }).done(function (data) { _this.setState(data, _this); });
    };
    StateProvider.prototype.editTask = function (task) {
        var _this = this;
        //TODO the interval stuff?
        this.loading();
        __WEBPACK_IMPORTED_MODULE_2_jquery__["post"](this.backEndUrl, {
            action: 'edit_task',
            id: task.id,
            name: task.name,
            description: task.description,
            type: task.type,
            fixed_value: task.fixed_value
        }).done(function (data) { _this.setState(data, _this); });
    };
    StateProvider.prototype.deleteTask = function (taskId) {
        var _this = this;
        this.loading();
        __WEBPACK_IMPORTED_MODULE_2_jquery__["post"](this.backEndUrl, {
            action: 'delete_task',
            id: taskId
        }).done(function (data) { _this.setState(data, _this); });
    };
    StateProvider.prototype.undeleteTask = function (taskId) {
        var _this = this;
        this.loading();
        __WEBPACK_IMPORTED_MODULE_2_jquery__["post"](this.backEndUrl, {
            action: 'undelete_task',
            id: taskId
        }).done(function (data) { _this.setState(data, _this); });
    };
    StateProvider.prototype.updateTaskStatus = function (task) {
        var _this = this;
        this.loading();
        __WEBPACK_IMPORTED_MODULE_2_jquery__["post"](this.backEndUrl, {
            action: 'update_task_status',
            id: task.id,
            status: task.status
        }).done(function (data) { _this.setState(data, _this); });
    };
    StateProvider.prototype.newAuctionBid = function (task) {
        var _this = this;
        this.loading();
        __WEBPACK_IMPORTED_MODULE_2_jquery__["post"](this.backEndUrl, {
            action: 'new_bid',
            task_id: task.id,
            uid: this.uid,
            points: task.bid
        }).done(function (data) { _this.setState(data, _this); });
    };
    StateProvider.prototype.collabOn = function (task) {
        var _this = this;
        this.loading();
        __WEBPACK_IMPORTED_MODULE_2_jquery__["post"](this.backEndUrl, {
            action: 'collab',
            task_id: task.id,
            uid: this.uid,
            points: task.min
        }).done(function (data) { _this.setState(data, _this); });
    };
    StateProvider.prototype.submitDinnerClaim = function (task, join) {
        var _this = this;
        this.loading();
        var action = (join ? 'dinner_join' : 'dinner_take');
        __WEBPACK_IMPORTED_MODULE_2_jquery__["post"](this.backEndUrl, {
            action: action,
            task_id: task.id,
            uid: this.uid
        }).done(function (data) { _this.setState(data, _this); });
    };
    StateProvider.prototype.abandonDinner = function (task) {
        var _this = this;
        this.loading();
        __WEBPACK_IMPORTED_MODULE_2_jquery__["post"](this.backEndUrl, {
            action: 'dinner_bail',
            task_id: task.id,
            uid: this.uid
        }).done(function (data) { _this.setState(data, _this); });
    };
    StateProvider.prototype.spontClaim = function (task) { this.spontClaimUpdate(task, false); };
    StateProvider.prototype.spontDisclaim = function (task) { this.spontClaimUpdate(task, true); };
    StateProvider.prototype.spontClaimUpdate = function (task, remove) {
        var _this = this;
        var action = (remove ? 'spont_bail' : 'spont_take');
        this.loading();
        __WEBPACK_IMPORTED_MODULE_2_jquery__["post"](this.backEndUrl, {
            action: action,
            task_id: task.id,
            uid: this.uid
        }).done(function (data) { _this.setState(data, _this); });
    };
    StateProvider.prototype.addTransaction = function (task_id, points, comment) {
        var _this = this;
        this.loading();
        __WEBPACK_IMPORTED_MODULE_2_jquery__["post"](this.backEndUrl, {
            action: 'add_transaction',
            uid: this.uid,
            task_id: task_id,
            points: points,
            comment: comment
        }).done(function (data) { _this.setState(data, _this); });
    };
    StateProvider.prototype.iterateToNextWeek = function () {
        var _this = this;
        this.loading('Calculating <strong>looong</strong> and <strong>hard</strong>...');
        __WEBPACK_IMPORTED_MODULE_2_jquery__["post"](this.backEndUrl, {
            action: 'iterate_to_next_week'
        }).done(function (data) { _this.setState(data, _this); });
    };
    StateProvider.prototype.updateSettings = function (values) {
        var _this = this;
        this.loading();
        __WEBPACK_IMPORTED_MODULE_2_jquery__["post"](this.backEndUrl, {
            action: 'update_settings',
            closing_time: values.closingTime,
            dinner_value: values.dinnerValue
        }).done(function (data) { _this.setState(data, _this); });
    };
    return StateProvider;
}());
StateProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_4__config_config__["a" /* ConfigProvider */]])
], StateProvider);

//# sourceMappingURL=state.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuctionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_state_state__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bid_modal_bid_modal__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__task_edit_modal_task_edit_modal__ = __webpack_require__(87);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AuctionPage = (function () {
    function AuctionPage(navCtrl, navParams, alertCtrl, stateProvider, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.stateProvider = stateProvider;
        this.modalCtrl = modalCtrl;
    }
    AuctionPage.prototype.userTasks = function () {
        //should return all auction tasks currently won or assigned to user
        var _this = this;
        return this.stateProvider.tasks.auction.filter(function (task) {
            for (var winner in task.winners) {
                if (task.winners[winner] === _this.stateProvider.uid) {
                    return true;
                }
            }
            return false;
        });
    };
    AuctionPage.prototype.currentGain = function () {
        var ut = this.userTasks();
        var i = ut.length;
        var gain = 0;
        while (i--) {
            gain += Math.floor(ut[i].bid / ut[i].winners.length);
        }
        return gain;
    };
    AuctionPage.prototype.stolenTasks = function () {
        var _this = this;
        return this.stateProvider.tasks.auction.filter(function (task) {
            if (_this.stateProvider.user.favtasks.indexOf(parseInt(task.id)) < 0) {
                return false;
            }
            for (var winner in task.winners) {
                if (task.winners.hasOwnProperty(winner)
                    && task.winners[winner] === _this.stateProvider.uid) {
                    return false;
                }
            }
            return true;
        });
    };
    AuctionPage.prototype.availableTasks = function () {
        var _this = this;
        //should return all auctions tasks currently not won or assigned to user
        return this.stateProvider.tasks.auction.filter(function (task) {
            if (_this.stateProvider.user.favtasks.indexOf(parseInt(task.id)) > -1) {
                return false;
            }
            for (var winner in task.winners) {
                if (task.winners.hasOwnProperty(winner)
                    && task.winners[winner] === _this.stateProvider.uid) {
                    return false;
                }
            }
            return true;
        });
    };
    AuctionPage.prototype.taskClicked = function (event, task) {
        console.log(event.target);
        if (event.target.className.indexOf('badge-md-light') > -1) {
            return null;
        }
        if (this.stateProvider.settings.auctionState == 0
            || (this.stateProvider.settings.auctionState != 2 && task.type == 'spontaneous')) {
            var bidModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__bid_modal_bid_modal__["a" /* BidModalPage */], { 'task': task, type: task.type });
            bidModal.present();
        }
        else if (this.stateProvider.settings.auctionState == 1) {
            this.presentTaskCompletionPrompt(event, task);
        }
        else if (this.stateProvider.settings.auctionState == 2) {
            var taskEditModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__task_edit_modal_task_edit_modal__["a" /* TaskEditModalPage */], { 'task': task, 'type': task.type, 'action': 'edit' });
            taskEditModal.present();
        }
    };
    AuctionPage.prototype.presentTaskCompletionPrompt = function (event, task) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Update Status',
            subTitle: task.name,
            message: 'What\'s the status of this task?',
            buttons: [
                {
                    text: 'Done',
                    cssClass: 'button-md my-alert-button done',
                    handler: function (data) {
                        task.status = 'done';
                        _this.stateProvider.updateTaskStatus(task);
                    }
                },
                {
                    text: 'No need to be done',
                    cssClass: 'button-md my-alert-button irrelevant',
                    handler: function (data) {
                        task.status = 'irrelevant';
                        _this.stateProvider.updateTaskStatus(task);
                    }
                },
                {
                    text: 'Failed',
                    cssClass: 'button-md my-alert-button failed',
                    handler: function (data) {
                        task.status = 'failed';
                        _this.stateProvider.updateTaskStatus(task);
                    }
                },
                {
                    text: 'We don\'t know! (Reset)',
                    cssClass: 'button-md my-alert-button',
                    handler: function (data) {
                        task.status = null;
                        _this.stateProvider.updateTaskStatus(task);
                    }
                },
                {
                    text: '← Nevermind',
                    cssClass: 'button-md my-alert-button button-md-light',
                }
            ]
        });
        alert.present();
    };
    AuctionPage.prototype.presentAddTaskPrompt = function () {
        var taskEditModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__task_edit_modal_task_edit_modal__["a" /* TaskEditModalPage */], { 'action': 'add' });
        taskEditModal.present();
    };
    return AuctionPage;
}());
AuctionPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-auction',template:/*ion-inline-start:"/home/shsk/TaskAuctionApp/src/pages/auction/auction.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n\n    <user-info-display></user-info-display>\n\n\n    <ion-title>Auction</ion-title>\n    <ion-badge color="danger" *ngIf="this.stateProvider.settings.auctionState == 2">Maintenance</ion-badge>\n\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-item-group>\n    <ion-item-divider *ngIf="this.userTasks().length; else no_tasks_message">\n      You got these tasks\n      <ion-badge item-end class="points"><ion-icon name="add-circle"></ion-icon> {{this.stateProvider.user_current_auction_gain}}</ion-badge>\n    </ion-item-divider>\n    <ng-template #no_tasks_message>\n      <ion-item-divider class="nooo">\n         <ion-icon name="alert"></ion-icon>\n        Time to do some tasks!  <ion-icon name="cart"></ion-icon> <ion-icon name="build"></ion-icon><ion-icon name="color-wand"></ion-icon>\n        <ion-icon name="speedometer"></ion-icon>\n        Earn some points! <ion-icon name="trophy"></ion-icon> <ion-icon name="nutrition"></ion-icon> <ion-icon name="ice-cream"></ion-icon> <ion-icon name="nuclear"></ion-icon>\n      </ion-item-divider></ng-template>\n    <div ion-item \n      *ngFor="let task of this.userTasks()"\n      [ngClass]="this.stateProvider.getTaskClasses(task)"\n      (click)="taskClicked($event, task)">\n\n      <h3>{{task.name}}</h3>\n      <p item-end class="assignees"><ion-badge color="light" *ngFor="let winner of task.winners" (click)="this.stateProvider.selectUser(winner)">{{ this.stateProvider.getUserName(winner) }}</ion-badge></p>\n      <ion-badge class="points" item-end>{{task.bid}}</ion-badge>\n      \n    </div>\n\n    <ion-item-divider *ngIf="this.stolenTasks().length">Oh mään! Someone underbid you on those!</ion-item-divider>\n    <div ion-item\n      *ngFor="let task of this.stolenTasks()"\n      [ngClass]="this.stateProvider.getTaskClasses(task)"\n      (click)="taskClicked($event, task)">\n      <h3>{{task.name}}</h3>\n      <p item-end class="assignees"><ion-badge color="light" *ngFor="let winner of task.winners" (click)="this.stateProvider.selectUser(winner)">{{ this.stateProvider.getUserName(winner) }}</ion-badge></p>\n      <ion-badge item-end class="points">{{task.bid}}</ion-badge>\n    </div>\n    <ion-item-divider>\n      <span *ngIf="this.stateProvider.settings.auctionState === 0">You can haz theese tasks<span *ngIf="this.stateProvider.user.favtasks.length">, too</span>!</span>\n      <span *ngIf="this.stateProvider.settings.auctionState !== 0">Other people\'s tasks</span>\n    </ion-item-divider>\n    <div ion-item\n      *ngFor="let task of this.availableTasks()"\n      [ngClass]="this.stateProvider.getTaskClasses(task)"\n      (click)="taskClicked($event, task)">\n      <h3>{{task.name}}</h3>\n      <p item-end class="assignees"><ion-badge color="light" *ngFor="let winner of task.winners" (click)="this.stateProvider.selectUser(winner)">{{ this.stateProvider.getUserName(winner) }}</ion-badge></p>\n      <ion-badge item-end class="points">{{task.bid}}</ion-badge>\n    </div>\n    <div id="spontasks" *ngIf="this.stateProvider.tasks.spontaneous.length">\n      <ion-item-divider>Feeling spontaneous?\n        <ion-badge item-end color="secondary" class="points"><ion-icon name="add-circle"></ion-icon> {{this.stateProvider.user_current_spont_gain}}</ion-badge>\n      </ion-item-divider>\n      <div ion-item\n      *ngFor="let task of this.stateProvider.tasks.spontaneous"\n      (click)="taskClicked($event, task)">\n        <h3>{{task.name}} <ion-badge color="secondary" class="points">{{task.fixed_value}}</ion-badge></h3>\n        <p item-end class="assignees"><ion-badge color="light" *ngFor="let winner of task.winners" (click)="this.stateProvider.selectUser(winner)">{{ this.stateProvider.getUserName(winner) }}</ion-badge></p>\n       \n      </div>\n    </div>\n    <div id="deltasks" *ngIf="stateProvider.settings.auctionState == 2">\n      <ion-item-divider>Deleted Tasks</ion-item-divider>\n      <button ion-item\n      *ngFor="let task of this.stateProvider.tasks.deleted"\n      (click)="taskClicked($event, task)">\n      <h3>{{ task.name}} </h3>\n      </button>\n    </div>\n  </ion-item-group>\n  \n  <button ion-button full *ngIf="stateProvider.settings.auctionState == 2" (click)="presentAddTaskPrompt()">Add New Task</button>\n</ion-content>\n'/*ion-inline-end:"/home/shsk/TaskAuctionApp/src/pages/auction/auction.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_state_state__["a" /* StateProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
], AuctionPage);

//# sourceMappingURL=auction.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(230);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_control_control__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_control_control_module__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_auction_auction__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_dinner_dinner__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_dinner_dinner_module__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_bid_modal_bid_modal_module__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_bid_modal_bid_modal__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_task_edit_modal_task_edit_modal__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_task_edit_modal_task_edit_modal_module__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_user_modal_user_modal__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_user_modal_user_modal_module__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_dashboard_dashboard__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_dashboard_dashboard_module__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_userInfoDisplay_userInfoDisplay__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_status_bar__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_splash_screen__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_storage__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_state_state__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_dashboard_dashboard__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_config_config__ = __webpack_require__(85);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

























var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_auction_auction__["a" /* AuctionPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/dashboard/dashboard.module#DashboardPageModule', name: 'DashboardPage', segment: 'dashboard', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/dinner/dinner.module#DinnerPageModule', name: 'DinnerPage', segment: 'dinner', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/bid-modal/bid-modal.module#BidModalPageModule', name: 'BidModalPage', segment: 'bid-modal', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/task-edit-modal/task-edit-modal.module#TaskEditModalPageModule', name: 'TaskEditModalPage', segment: 'task-edit-modal', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/user-modal/user-modal.module#UserModalPageModule', name: 'UserModalPage', segment: 'user-modal', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_21__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_10__pages_bid_modal_bid_modal_module__["BidModalPageModule"],
            __WEBPACK_IMPORTED_MODULE_17__pages_dashboard_dashboard_module__["DashboardPageModule"],
            __WEBPACK_IMPORTED_MODULE_9__pages_dinner_dinner_module__["DinnerPageModule"],
            __WEBPACK_IMPORTED_MODULE_13__pages_task_edit_modal_task_edit_modal_module__["TaskEditModalPageModule"],
            __WEBPACK_IMPORTED_MODULE_15__pages_user_modal_user_modal_module__["UserModalPageModule"],
            __WEBPACK_IMPORTED_MODULE_18__components_userInfoDisplay_userInfoDisplay__["b" /* UserInfoDisplayModule */],
            __WEBPACK_IMPORTED_MODULE_6__pages_control_control_module__["a" /* ControlPageModule */],
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_control_control__["a" /* ControlPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_auction_auction__["a" /* AuctionPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_dinner_dinner__["a" /* DinnerPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_bid_modal_bid_modal__["a" /* BidModalPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_task_edit_modal_task_edit_modal__["a" /* TaskEditModalPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_user_modal_user_modal__["a" /* UserModalPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_dashboard_dashboard__["a" /* DashboardPage */],
            __WEBPACK_IMPORTED_MODULE_18__components_userInfoDisplay_userInfoDisplay__["a" /* UserInfoDisplay */],
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_19__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_20__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_22__providers_state_state__["a" /* StateProvider */],
            __WEBPACK_IMPORTED_MODULE_23__providers_dashboard_dashboard__["a" /* DashboardProvider */],
            __WEBPACK_IMPORTED_MODULE_24__providers_config_config__["a" /* ConfigProvider */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_control_control__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_auction_auction__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_dinner_dinner__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_dashboard_dashboard__ = __webpack_require__(83);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_auction_auction__["a" /* AuctionPage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Auction', component: __WEBPACK_IMPORTED_MODULE_5__pages_auction_auction__["a" /* AuctionPage */] },
            { title: 'Dinner', component: __WEBPACK_IMPORTED_MODULE_6__pages_dinner_dinner__["a" /* DinnerPage */] },
            { title: 'Control Room', component: __WEBPACK_IMPORTED_MODULE_4__pages_control_control__["a" /* ControlPage */] },
            { title: 'Dashboard', component: __WEBPACK_IMPORTED_MODULE_7__pages_dashboard_dashboard__["a" /* DashboardPage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/home/shsk/TaskAuctionApp/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/home/shsk/TaskAuctionApp/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ControlPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__control__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_userInfoDisplay_userInfoDisplay__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ControlPageModule = (function () {
    function ControlPageModule() {
    }
    return ControlPageModule;
}());
ControlPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__control__["a" /* ControlPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__control__["a" /* ControlPage */]),
            __WEBPACK_IMPORTED_MODULE_3__components_userInfoDisplay_userInfoDisplay__["b" /* UserInfoDisplayModule */],
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__components_userInfoDisplay_userInfoDisplay__["a" /* UserInfoDisplay */],
        ],
    })
], ControlPageModule);

//# sourceMappingURL=control.module.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserInfoDisplay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return UserInfoDisplayModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_state_state__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_user_modal_user_modal__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import { DataProvider } from '../../providers/data/data'; 

// import { UserProvider} from '../../providers/user/user';


var UserInfoDisplay = (function () {
    function UserInfoDisplay(//private userProvider: UserProvider) {
        stateProvider, modalCtrl) {
        this.stateProvider = stateProvider;
        this.modalCtrl = modalCtrl;
    }
    UserInfoDisplay.prototype.presentUserPrompt = function () {
        var userModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__pages_user_modal_user_modal__["a" /* UserModalPage */], { 'task': null, type: 'auction' });
        userModal.present();
    };
    return UserInfoDisplay;
}());
UserInfoDisplay = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'user-info-display',
        template: "\n\n      <button ion-button secondary (click)=\"presentUserPrompt()\">\n        {{ (stateProvider.user.name.length ? stateProvider.user.name : 'Select User') }}\n      </button>\n      <ion-badge item-end class=\"points\"><ion-icon name=\"add-circle\"></ion-icon> {{ this.stateProvider.user_current_gain }} </ion-badge>"
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_state_state__["a" /* StateProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
], UserInfoDisplay);

var UserInfoDisplayModule = (function () {
    function UserInfoDisplayModule() {
    }
    return UserInfoDisplayModule;
}());
UserInfoDisplayModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            UserInfoDisplay,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicModule */],
        ],
        entryComponents: [
            UserInfoDisplay,
        ],
        exports: [
            UserInfoDisplay,
        ]
    })
], UserInfoDisplayModule);

//# sourceMappingURL=userInfoDisplay.js.map

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_state_state__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserModalPage = (function () {
    function UserModalPage(navCtrl, navParams, stateProvider, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.stateProvider = stateProvider;
        this.viewCtrl = viewCtrl;
        this.users = this.stateProvider.users;
        this.transactions = this.stateProvider.user.transactions;
        this.searchstr = this.stateProvider.user.name;
        this.filterList();
    }
    UserModalPage.prototype.clearInput = function () {
        this.searchstr = '';
        this.filterList();
    };
    UserModalPage.prototype.selectUser = function () {
        if (this.users.length === 1) {
            this.userSelected = true;
            this.stateProvider.uid = parseInt(this.users[0].id);
            this.stateProvider.selectUser();
        }
        else {
            this.userSelected = false;
            setTimeout(function () {
                var el = __WEBPACK_IMPORTED_MODULE_3_jquery__('.searchbar .searchbar-input').get(0);
                if (el !== undefined) {
                    el.focus();
                }
            }, 5);
        }
    };
    UserModalPage.prototype.filterList = function () {
        this.users = this.stateProvider.users;
        var val = this.searchstr;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.users = this.users.filter(function (item) {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
        this.selectUser();
    };
    UserModalPage.prototype.selectEntry = function (ev, user) {
        this.searchstr = user.name;
        this.filterList();
    };
    UserModalPage.prototype.createUser = function () {
        this.stateProvider.addUser(this.searchstr);
        this.viewCtrl.dismiss();
    };
    UserModalPage.prototype.allocatePoints = function (factor) {
        var points = parseFloat(this.deltapoints) * factor;
        if (isNaN(points)) {
            this.stateProvider.showError('You call that a number?!');
            return false;
        }
        if (this.deltareason === undefined || !this.deltareason.length) {
            this.stateProvider.showError('Give me one good reason!');
            return false;
        }
        this.stateProvider.addTransaction(null, points, this.deltareason);
        this.deltapoints = '';
        this.deltareason = '';
    };
    return UserModalPage;
}());
UserModalPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-modal',template:/*ion-inline-start:"/home/shsk/TaskAuctionApp/src/pages/user-modal/user-modal.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>User Settings</ion-title>\n	  <ion-buttons end>\n	   	<button *ngIf="userSelected" ion-button icon-left (click)="this.viewCtrl.dismiss()">\n        <ion-icon name="checkmark"></ion-icon>\n        Done\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n<div *ngIf="!userSelected">\n	<h6>Select Task Auction User</h6>\n\n  <ion-searchbar (ionInput)="filterList()" [(ngModel)]="searchstr"></ion-searchbar>\n\n  <ion-list>\n    <button ion-item \n      (click)="selectEntry($event, user)"\n      *ngFor="let user of users"\n      [ngClass]="{selected: userSelected}">\n      {{ user.name }}<ion-badge item-end>{{ user.points }}</ion-badge>\n    </button>\n    <button *ngIf="users.length < 1" ion-button full (click)="createUser();">\n      Create this user\n    </button>\n  </ion-list>\n</div>\n\n<ion-item *ngIf="userSelected" class="selectedUser">\n  {{ users[0].name }}\n  <button ion-button item-end (click)="clearInput();">\n    Switch User\n  </button>\n</ion-item>\n\n<ion-card *ngIf="userSelected">\n  <ion-card-header>\n    Points: <span class="swank-points">{{this.stateProvider.user.points }}</span> \n  </ion-card-header>\n</ion-card>\n\n<ion-card class="pointAdjustmentWidget" *ngIf="userSelected">\n  <ion-card-header>\n    Manual Point Adjustment\n  </ion-card-header>\n <ion-card-content>\n\n    <ion-item>\n      <ion-label>Reason:</ion-label>\n      <ion-input type="string" [(ngModel)]="deltareason" ></ion-input>\n    </ion-item>\n    <ion-item>\n      <button ion-button item-start icon-only color="danger" round (click)="allocatePoints(-1)">\n        <ion-icon name="remove"></ion-icon>\n      </button>  \n      \n      <button ion-button item-end  icon-only color="secondary" round (click)="allocatePoints(1)">\n        <ion-icon name="add"></ion-icon>\n      </button>\n      <ion-input type="number" placeholder="Amount" [(ngModel)]="deltapoints" ></ion-input>\n    </ion-item>\n  </ion-card-content>\n</ion-card>\n\n<ion-card class="pointTransactionHistory" *ngIf="userSelected">\n  <ion-card-header>\n    Point Transaction History\n  </ion-card-header>\n  <ion-card-content>\n    <ion-item-group>\n      <ion-item *ngFor="let transaction of this.stateProvider.user.transactions">\n        <ion-badge color="secondary" class="points" *ngIf="transaction.points > 0">\n          <ion-icon name="add"></ion-icon> {{transaction.points}}\n        </ion-badge>\n        <ion-badge color="danger" class="points" *ngIf="transaction.points < 0">\n          <ion-icon name="remove"></ion-icon> {{-1 * transaction.points}}\n        </ion-badge>\n        <p item-end class="transinfo">\n          <ion-badge>{{transaction.time}}</ion-badge><br>\n          <ion-badge color="dark">{{ this.stateProvider.getTaskName(transaction.task_id) }}</ion-badge><br>\n          <ion-badge color="light">{{transaction.ip}}</ion-badge>\n        </p>\n        <p>{{transaction.comment}}</p>\n      </ion-item>\n    </ion-item-group>\n  </ion-card-content>\n</ion-card>\n</ion-content>\n'/*ion-inline-end:"/home/shsk/TaskAuctionApp/src/pages/user-modal/user-modal.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_state_state__["a" /* StateProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */]])
], UserModalPage);

//# sourceMappingURL=user-modal.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BidModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_state_state__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_user_modal_user_modal__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var BidModalPage = (function () {
    function BidModalPage(navCtrl, navParams, viewCtrl, stateProvider, toastCtrl, modalCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.stateProvider = stateProvider;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.task = navParams.get('task');
        this.type = navParams.get('type');
        this.stateProvider = stateProvider;
        this.inputs = { bid: (this.task.bid ? (this.task.bid - 1) : '') };
        if (!this.stateProvider.isValidUser()) {
            var userModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__pages_user_modal_user_modal__["a" /* UserModalPage */], {});
            userModal.present();
        }
    }
    BidModalPage.prototype.submitAuctionBid = function (event) {
        if (this.inputs.bid == ''
            || parseInt(this.stateProvider.settings.auctionState) !== 0
            || (this.task.bid !== undefined && parseInt(this.task.bid) <= parseInt(this.inputs.bid))) {
            var toast = this.toastCtrl.create({
                message: 'Try harder (that\'s what she said)',
                duration: 2000,
                position: 'top',
                cssClass: 'error'
            });
            toast.present();
            return false;
        }
        var newTask = this.task;
        newTask.bid = this.inputs.bid;
        this.stateProvider.newAuctionBid(newTask);
        this.viewCtrl.dismiss();
    };
    BidModalPage.prototype.submitSpontClaim = function (event) {
        this.stateProvider.spontClaim(this.task);
        this.viewCtrl.dismiss();
    };
    BidModalPage.prototype.submitSpontDisclaim = function (event) {
        this.stateProvider.spontDisclaim(this.task);
    };
    BidModalPage.prototype.submitDinnerClaim = function (event) {
        var _this = this;
        var task = this.task;
        if (task.winners.length) {
            var alert_1 = this.alertCtrl.create({
                title: 'Take this dinner?',
                subTitle: 'Steal it from the current owners?',
                message: '',
                buttons: [
                    {
                        text: 'I am the master chef!',
                        cssClass: 'button-md my-alert-button done',
                        handler: function (data) {
                            _this.stateProvider.submitDinnerClaim(task, false); //take it, don't join
                            _this.viewCtrl.dismiss();
                        }
                    },
                    {
                        text: 'Not that hungry, actually.',
                        cssClass: 'button-md my-alert-button irrelevant',
                    }
                ]
            });
            alert_1.present();
        }
        else {
            this.stateProvider.submitDinnerClaim(task, false);
            this.viewCtrl.dismiss();
        }
    };
    BidModalPage.prototype.submitCollaborate = function (events) {
        var _this = this;
        var msg = (this.type === 'dinner' ?
            'Too many cooks are spoiling the brei!' :
            'You have to ask the current owner(s) of this task first.'), confirm = (this.type === 'dinner' ?
            'We will cook like never before!' :
            'Agreement already established!'), decline = (this.type === 'dinner' ?
            'Okaaaay, no MSG...' :
            'Oh boy, let me reconsider.');
        var alert = this.alertCtrl.create({
            title: 'Achtung!',
            subTitle: 'Consensus required!',
            message: msg,
            buttons: [
                {
                    text: confirm,
                    cssClass: 'button-md my-alert-button done',
                    handler: function (data) {
                        if (_this.type === 'dinner') {
                            _this.stateProvider.submitDinnerClaim(_this.task, true);
                        }
                        else {
                            _this.stateProvider.collabOn(_this.task);
                        }
                        _this.viewCtrl.dismiss();
                    }
                },
                {
                    text: decline,
                    cssClass: 'button-md my-alert-button irrelevant',
                    handler: function (data) {
                    }
                }
            ]
        });
        alert.present();
    };
    BidModalPage.prototype.abandonDinner = function () {
        var task = this.task;
        var alert = this.alertCtrl.create({
            title: 'Noooooooooooooo!',
            message: '',
            buttons: ['Yes']
        });
        alert.present();
        this.stateProvider.abandonDinner(task);
        this.viewCtrl.dismiss();
    };
    BidModalPage.prototype.userHasTask = function () {
        var i = this.task.winners.length;
        while (i--) {
            if (this.task.winners[i] === this.stateProvider.uid) {
                return true;
            }
        }
        return false;
    };
    return BidModalPage;
}());
BidModalPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-bid-modal',template:/*ion-inline-start:"/home/shsk/TaskAuctionApp/src/pages/bid-modal/bid-modal.html"*/'<ion-header>\n\n  <ion-navbar>\n    <user-info-display></user-info-display>\n\n    <ion-title>Bid for task</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="this.viewCtrl.dismiss()">\n        <ion-icon name="close"></ion-icon>\n        \n      </button>\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n<ion-card>\n  <ion-card-header>\n    <h2>{{task.name}}\n    <small *ngIf="type == \'spontaneous\'">(<ion-badge  color="secondary"><span class="swank-ponts">{{task.fixed_value}}</span></ion-badge> each)</small>\n    </h2>\n  </ion-card-header>\n  <ion-card-content>\n    <ion-item class="current-bid"><h3 *ngIf="task.bid">Current price</h3>\n      <h3 *ngIf="type == \'dinner\' && task.winners.length > 0">Current cooks</h3>\n\n      <div *ngIf="task.winners.length < 1" class="upforgrabs">\n        <span *ngIf="type == \'auction\'">Be the <strong>first</strong>,<br> name your price!</span>\n        <span *ngIf="type == \'dinner\'">Quieres cocinar?</span>\n    </div>\n    <p class="assignees"><ion-badge color="light" *ngFor="let winner of task.winners">\n      {{ this.stateProvider.getUserName(winner) }}\n    </ion-badge></p>\n    <h2 class="swank-points">{{task.bid}}</h2>\n  </ion-item>\n  <p>{{task.description}}</p>\n\n  </ion-card-content> \n  \n</ion-card>\n\n  <ion-item *ngIf="task.winners.length > 0 && !userHasTask() && (type == \'auction\' || type == \'dinner\')">\n    <button ion-button full (click)="submitCollaborate($event)">\n      Join the fun - Do it together\n    </button>\n    <p *ngIf="type == \'auction\'"><small>Points will be split evenly among participants</small></p>\n    <p *ngIf="type == \'dinner\'"><small>Every cook will receive <strong>{{ this.stateProvider.settings.dinner_value }}</strong> Points.</small></p>\n  </ion-item>\n\n  <ion-item class="hasTask" *ngIf="userHasTask()">\n    <h2 *ngIf="type == \'auction\'">You currently hold this task! Sick!</h2>\n    <h2 *ngIf="type == \'dinner\'">You are cooking on this day! Make a feast!</h2>\n  </ion-item>\n  \n  <ion-item>\n    <ion-label *ngIf="type == \'auction\' && task.bid">My minimal offer is</ion-label>\n    <ion-label *ngIf="type == \'auction\' && !task.bid">My initial offer is</ion-label>\n    <ion-input *ngIf="type == \'auction\'" max="{{ (task.bid - 1) }}" type="number" placeholder="Your Bid" [(ngModel)]="inputs.bid" class="points"></ion-input>\n\n    <button *ngIf="type == \'auction\'" ion-button item-end (click)="submitAuctionBid($event)">\n      Place Bid\n    </button>\n    <button *ngIf="type == \'spontaneous\'" ion-button full color="secondary" (click)="submitSpontClaim($event)">\n      <span *ngIf="!userHasTask()">I did it!</span>\n      <span *ngIf="userHasTask()">Oops, I did it again!</span>\n    </button>\n    <button *ngIf="type == \'spontaneous\' && userHasTask()" ion-button full color="danger" (click)="submitSpontDisclaim($event)">\n      Oh actually I didn\'t do that.\n    </button>\n    <div *ngIf="type == \'dinner\'">\n      <button *ngIf="!userHasTask()" ion-button full (click)="submitDinnerClaim($event)">Claim Dinner</button>\n      <button *ngIf="userHasTask()" ion-button full color="danger" (click)="abandonDinner($event)">Abandon Dinner</button>\n    </div>\n  </ion-item>\n  \n  <button ion-button full color="light" icon-left\n    (click)="this.viewCtrl.dismiss()">\n    <ion-icon name="arrow-back"></ion-icon>\n    Nevermind\n  </button>\n    \n</ion-content>\n'/*ion-inline-end:"/home/shsk/TaskAuctionApp/src/pages/bid-modal/bid-modal.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_state_state__["a" /* StateProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], BidModalPage);

//# sourceMappingURL=bid-modal.js.map

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_dashboard_dashboard__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_state_state__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DashboardPage = (function () {
    function DashboardPage(navCtrl, navParams, dashboardProvider, stateProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dashboardProvider = dashboardProvider;
        this.stateProvider = stateProvider;
        // this.dashboardProvider = dashboardProvider;
        // this.stateProvider = stateProvider;
        console.log(this);
    }
    DashboardPage.prototype.getUsers = function () {
        return this.dashboardProvider.users;
    };
    DashboardPage.prototype.getAverage = function () {
        return this.dashboardProvider.average;
    };
    DashboardPage.prototype.getThClass = function (str) {
        if (this.dashboardProvider.current_sort === str
            || this.dashboardProvider.current_sort === str + '_inv') {
            return 'active';
        }
        else {
            return null;
        }
    };
    DashboardPage.prototype.getRowClass = function (user) {
        return (user.id === this.stateProvider.uid ? 'active-user' : '');
    };
    // getCurrentGainOf(user) {
    //   return this.stateProvider.getUserCurrentGain(parseInt(user.id));
    // }
    DashboardPage.prototype.percent = function (x) {
        return (x * 100).toFixed(1) + '%';
    };
    DashboardPage.prototype.getCurrentUser = function () {
        for (var _i = 0, _a = this.dashboardProvider.users; _i < _a.length; _i++) {
            var user = _a[_i];
            if (user.id == this.stateProvider.uid) {
                return user;
            }
        }
        return { name: '', points_avg_lastoneweek: '', points_avg_lastfourweeks: '', points_avg_alltime: '' };
    };
    return DashboardPage;
}());
DashboardPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-dashboard',template:/*ion-inline-start:"/home/shsk/TaskAuctionApp/src/pages/dashboard/dashboard.html"*/'<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    <user-info-display></user-info-display>\n\n    <ion-title>Dashboard</ion-title>\n\n    <ion-badge color="danger" *ngIf="this.stateProvider.settings.auctionState == 2">Maintenance</ion-badge>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  \n  <ion-grid>\n    <ion-row class="headrow">\n      <ion-col col-auto>\n        <h4>#</h4>\n      </ion-col>\n      <ion-col>\n        <h4>Name</h4>\n      </ion-col>\n      <ion-col (click)="dashboardProvider.sortUsers(\'current_gain\')" [ngClass]="getThClass(\'current_gain\')">\n        <h4>Current Week \n          <ion-icon *ngIf="dashboardProvider.current_sort === \'current_gain\'" name="ios-arrow-down"></ion-icon>\n          <ion-icon *ngIf="dashboardProvider.current_sort === \'current_gain_inv\'" name="ios-arrow-up"></ion-icon>\n        </h4>\n      </ion-col> \n      <ion-col (click)="dashboardProvider.sortUsers(\'points_lastweek\')" [ngClass]="getThClass(\'points_lastweek\')">\n        <h4>Last Week\n          <ion-icon *ngIf="dashboardProvider.current_sort === \'points_lastweek\'" name="ios-arrow-down"></ion-icon>\n          <ion-icon *ngIf="dashboardProvider.current_sort === \'points_lastweek_inv\'" name="ios-arrow-up"></ion-icon>\n        </h4>\n      </ion-col>\n      <ion-col (click)="dashboardProvider.sortUsers(\'points_avg_fourweeks\')" [ngClass]="getThClass(\'points_avg_fourweeks\')">\n        <h4>4 weeks avg\n          <ion-icon *ngIf="dashboardProvider.current_sort === \'points_avg_fourweeks\'" name="ios-arrow-down"></ion-icon>\n          <ion-icon *ngIf="dashboardProvider.current_sort === \'points_avg_fourweeks_inv\'" name="ios-arrow-up"></ion-icon>\n        </h4>\n      </ion-col>\n      <ion-col (click)="dashboardProvider.sortUsers(\'points\')" [ngClass]="getThClass(\'points\')">\n        <h4>Total\n          <ion-icon *ngIf="dashboardProvider.current_sort === \'points\'" name="ios-arrow-down"></ion-icon>\n          <ion-icon *ngIf="dashboardProvider.current_sort === \'points_inv\'" name="ios-arrow-up"></ion-icon>\n        </h4>\n      </ion-col>\n    </ion-row>\n        \n    <ion-row class="average-sum">\n      <ion-col col-auto></ion-col>\n      <ion-col>\n        Averages:\n      </ion-col>\n      <ion-col>\n        {{ dashboardProvider.average.current_gain.toFixed(2) }}\n      </ion-col>\n      <ion-col>\n        {{ dashboardProvider.average.lastweek.toFixed(2) }}\n      </ion-col>\n      <ion-col>\n        {{ dashboardProvider.average.avg_fourweeks.toFixed(2) }}\n      </ion-col>\n      <ion-col>\n        {{ dashboardProvider.average.total.toFixed(2) }}\n      </ion-col>\n    </ion-row>\n    \n    <ion-row *ngFor="let user of this.getUsers(); let i = index" [ngClass]="getRowClass(user)">\n      <ion-col col-auto>{{(i+1)}}</ion-col>\n      <ion-col>\n        {{user.name}}\n      </ion-col>\n      <ion-col>\n        <ion-badge *ngIf="user.current_gain !== null" class="points">\n          <ion-icon name="add-circle"></ion-icon> {{user.current_gain}}\n        </ion-badge> ({{ percent(user.current_gain_rel) }})\n      </ion-col>\n      <ion-col>\n        <ion-badge>{{user.points_lastweek}}</ion-badge> ({{ percent(user.points_lastweek_rel) }})\n      </ion-col>\n      <ion-col>\n        <ion-badge>{{user.points_avg_fourweeks}}</ion-badge> ({{ percent(user.points_avg_fourweeks_rel) }})\n      </ion-col>\n      <ion-col>\n        ({{ percent(user.points_rel) }}) <ion-badge>{{user.points}}</ion-badge> \n      </ion-col>\n    </ion-row>\n\n  </ion-grid>\n\n\n</ion-content>\n'/*ion-inline-end:"/home/shsk/TaskAuctionApp/src/pages/dashboard/dashboard.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_dashboard_dashboard__["a" /* DashboardProvider */],
        __WEBPACK_IMPORTED_MODULE_3__providers_state_state__["a" /* StateProvider */]])
], DashboardPage);

//# sourceMappingURL=dashboard.js.map

/***/ }),

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/*
    JS related config

*/
var ConfigProvider = (function () {
    function ConfigProvider() {
        // point to the backend scripts location on a webserver with php
        this.backEndUrl = '//localhost:8000/slingshot.php';
    }
    return ConfigProvider;
}());
ConfigProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], ConfigProvider);

//# sourceMappingURL=config.js.map

/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DinnerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bid_modal_bid_modal__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_state_state__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DinnerPage = (function () {
    function DinnerPage(navCtrl, navParams, modalCtrl, stateProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.stateProvider = stateProvider;
    }
    DinnerPage.prototype.taskClicked = function (event, task) {
        // chill out on quick user switch
        if (event.target.className.indexOf('badge-md-light') > -1) {
            return null;
        }
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__bid_modal_bid_modal__["a" /* BidModalPage */], { 'task': task, 'type': 'dinner' });
        modal.present();
    };
    return DinnerPage;
}());
DinnerPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-dinner',template:/*ion-inline-start:"/home/shsk/TaskAuctionApp/src/pages/dinner/dinner.html"*/'<ion-header>\n  <ion-navbar>\n      <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n      </button>\n\n      <user-info-display></user-info-display>\n\n    <ion-title>Dinner</ion-title>\n\n\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list>\n    <div ion-item *ngFor="let task of stateProvider.tasks.dinner" (click)="taskClicked($event, task)">\n      <h3>{{task.name}}</h3>\n      <ion-badge *ngIf="task.winners.length < 1" color="danger" item-end>Impending starvation!</ion-badge>\n      <p item-end class="assignees"><ion-badge color="light" *ngFor="let winner of task.winners" (click)="this.stateProvider.selectUser(winner)">{{ this.stateProvider.getUserName(winner) }}</ion-badge></p>\n    </div>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/shsk/TaskAuctionApp/src/pages/dinner/dinner.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_state_state__["a" /* StateProvider */]])
], DinnerPage);

//# sourceMappingURL=dinner.js.map

/***/ }),

/***/ 87:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskEditModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_state_state__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TaskEditModalPage = (function () {
    function TaskEditModalPage(navCtrl, navParams, viewCtrl, stateProvider, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.stateProvider = stateProvider;
        this.formBuilder = formBuilder;
        this.action = navParams.get('action'); //'add' or 'edit'
        if (this.action == 'edit') {
            this.oldTask = navParams.get('task');
            this.type = navParams.get('type');
        }
        else {
            this.oldTask = { name: 'New Task', description: '', type: 'auction' };
            this.type = 'auction';
        }
        this.taskForm = formBuilder.group({
            name: [this.oldTask.name, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            description: [this.oldTask.description, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            type: [this.type, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            interval: [{ value: 'default', disabled: true }],
            fixed_value: [parseInt(this.oldTask.fixed_value)]
        });
    }
    TaskEditModalPage.prototype.submit = function () {
        if (this.taskForm.valid == false) {
            this.stateProvider.showError('Form not valid! (Fields missing? Name too long?)');
            return;
        }
        var value = this.taskForm.value;
        var newTask = { name: value.name,
            description: value.description,
            type: value.type,
            fixed_value: value.fixed_value,
            interval: value.interval,
            id: ''
        };
        if (this.action == 'edit') {
            newTask.id = this.oldTask.id;
            this.stateProvider.editTask(newTask);
        }
        else if (this.action == 'add') {
            this.stateProvider.addTask(newTask);
        }
        this.viewCtrl.dismiss();
    };
    TaskEditModalPage.prototype.delete = function () {
        this.stateProvider.deleteTask(this.oldTask.id);
        this.viewCtrl.dismiss();
    };
    TaskEditModalPage.prototype.undelete = function () {
        this.stateProvider.undeleteTask(this.oldTask.id);
        this.viewCtrl.dismiss();
    };
    return TaskEditModalPage;
}());
TaskEditModalPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-task-edit-modal',template:/*ion-inline-start:"/home/shsk/TaskAuctionApp/src/pages/task-edit-modal/task-edit-modal.html"*/'<!--\n  Generated template for the TaskEditModal page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <!-- <user-info-display></user-info-display> -->\n\n    <ion-title>Edit task</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="this.viewCtrl.dismiss()">\n        <ion-icon name="close"></ion-icon>\n        \n      </button>\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <form [formGroup]="taskForm" (ngSubmit)="onSubmit(taskForm.value)">\n    <ion-item>\n      <ion-label stacked>Name</ion-label>\n      <ion-input formControlName="name" type="text" pattern=".{1,50}"></ion-input>\n    </ion-item>\n    \n    <ion-item>\n      <ion-label stacked>Description</ion-label>\n      <ion-textarea formControlName="description"></ion-textarea>\n    </ion-item>\n    \n    <ion-item>\n      <ion-label stacked>Type</ion-label>\n      <ion-select formControlName="type">\n        <ion-option value="auction">Auction</ion-option>\n        <ion-option value="spontaneous">Spontaneous</ion-option>\n      </ion-select>\n    </ion-item>\n    \n    <ion-item *ngIf="this.taskForm.value.type == \'auction\'">\n      <ion-label stacked>Interval</ion-label>\n      <ion-select formControlName="interval">\n        <ion-option value="default">Not implemented!</ion-option>\n        <ion-option value="week">Once a week</ion-option>\n        <ion-option value="twoweeks">Once every two weeks</ion-option>\n        <ion-option value="fourweeks">Once every four weeks</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item *ngIf="this.taskForm.value.type == \'spontaneous\'">\n      <ion-label stacked>Fixed Value</ion-label>\n      <ion-input formControlName="fixed_value" type="number"></ion-input>\n    </ion-item>\n  </form>\n\n  <button ion-button full color="primary" (click)="submit()">Submit!</button>\n  <button ion-button full color="danger" *ngIf="this.oldTask.status !== \'deleted\'" (click)="delete()">Delete!</button>\n  <button ion-button full color="danger" *ngIf="this.oldTask.status === \'deleted\'" (click)="undelete()">Undelete</button>\n</ion-content>\n'/*ion-inline-end:"/home/shsk/TaskAuctionApp/src/pages/task-edit-modal/task-edit-modal.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_state_state__["a" /* StateProvider */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]])
], TaskEditModalPage);

//# sourceMappingURL=task-edit-modal.js.map

/***/ })

},[212]);
//# sourceMappingURL=main.js.map