import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateProvider } from '../../providers/state/state';

@IonicPage()
@Component({
  selector: 'page-task-edit-modal',
  templateUrl: 'task-edit-modal.html',
})
export class TaskEditModalPage {
  taskForm: FormGroup;
  oldTask;
  type;
  action;

  constructor(
  public navCtrl: NavController,
  public navParams: NavParams,
  public viewCtrl: ViewController,
  public stateProvider: StateProvider,
  public formBuilder: FormBuilder) {

    this.action = navParams.get('action'); //'add' or 'edit'
    if (this.action == 'edit') {
      this.oldTask = navParams.get('task');
      this.type = navParams.get('type');
    } else {
      this.oldTask = { name: 'New Task', description: '', type: 'auction' };
      this.type = 'auction';
    }

    this.taskForm = formBuilder.group({
      name: [this.oldTask.name, Validators.required ],
      description: [this.oldTask.description, Validators.required],
      type: [this.type, Validators.required],
      interval: [{value: 'default', disabled: true}],
      fixed_value: [parseInt(this.oldTask.fixed_value)]
    });
  }

  submit() {
    if (this.taskForm.valid == false) {

      this.stateProvider.showError('Form not valid! (Fields missing? Name too long?)');
      return;
    }
    
    let value = this.taskForm.value;
    let newTask = { name: value.name,
                    description: value.description,
                    type: value.type,
                    fixed_value: value.fixed_value,
                    interval: value.interval,
                    id: ''
    };
    
    if (this.action == 'edit') {
      newTask.id = this.oldTask.id;
      this.stateProvider.editTask(newTask);
    } else if (this.action == 'add') {
      this.stateProvider.addTask(newTask);
    }
    this.viewCtrl.dismiss();
  }

  delete() {
    this.stateProvider.deleteTask(this.oldTask.id);
    this.viewCtrl.dismiss();
  }
  undelete() {
    this.stateProvider.undeleteTask(this.oldTask.id);
    this.viewCtrl.dismiss();
  }

}
