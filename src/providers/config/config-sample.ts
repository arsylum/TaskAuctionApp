import { Injectable } from '@angular/core';

/*
	JS related config

*/
@Injectable()
export class ConfigProvider {

	public backEndUrl: string;
  constructor() {
    
    // point to the backend scripts location on a webserver with php
    this.backEndUrl = '//localhost/taskauction/backend/slingshot.php';
  }

}
