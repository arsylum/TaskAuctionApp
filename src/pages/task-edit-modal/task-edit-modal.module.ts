import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskEditModalPage } from './task-edit-modal';

@NgModule({
  declarations: [
    TaskEditModalPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskEditModalPage),
  ],
})
export class TaskEditModalPageModule {}
