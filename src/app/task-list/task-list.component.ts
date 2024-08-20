import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { task } from './task.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  public taskList: task[] = []

  constructor(private _data: DataService, private router: Router) {
    // this._data.getStudentRecords();
    
  }
  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this._data.getStudentRecords().subscribe((data: any) => {
      // Store the data in session storage
      if (!sessionStorage.getItem('taskData')) {
        
        sessionStorage.setItem('taskData', JSON.stringify(data));
      }
      
      // Update taskList with the latest data from session storage
      this.taskList = JSON.parse(sessionStorage.getItem('taskData') || '[]');
    });
  }

  editData(task: task) {
    // console.log(task);
    this._data.sendData(task);
    this.router.navigate(['form', task])
  }

  createTask() {
    this.router.navigate(['form'])
  }


  deleteTask(id: number): void {
    const existingData = JSON.parse(sessionStorage.getItem('taskData') || '[]');
    const updatedData = existingData.filter((task: any) => task.id !== id);
    
    sessionStorage.setItem('taskData', JSON.stringify(updatedData));
    this.loadTasks(); // Reload tasks after deletion
  }
}
