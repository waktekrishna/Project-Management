import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { task } from '../task-list/task.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit{

  taskForm!: FormGroup;
  public taskDetail: any

  statuses = ['Pending', 'In Progress', 'Completed'];
  priorities = ['Low', 'Medium', 'High'];


  constructor( private _data : DataService,private fb: FormBuilder, private router: Router) { }
  

  ngOnInit(): void {

    this.taskForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      dueDate: ['', Validators.required],
    });

    
    this._data.getData().subscribe((data: any) => {
      this.taskDetail = data
      console.log("Comp Data", this.taskDetail);
    })
    this.patchValue()
  }

  patchValue() {
    this.taskForm.patchValue({
      id: this.taskDetail?.id,
      title: this.taskDetail?.title,
      status: this.taskDetail?.status,
      priority: this.taskDetail?.priority,
      dueDate: this.taskDetail?.dueDate,
    })
  }

  
  onSubmit(): void {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
  
      // Retrieve existing data from session storage
      const existingData = sessionStorage.getItem('taskData');
      let tasks = existingData ? JSON.parse(existingData) : [];
  
      // Check if the taskData already has an ID (i.e., it's being edited)
      if (taskData.id) {
        // Find the index of the existing task and update it
        const index = tasks.findIndex((task: { id: number }) => task.id === taskData.id);
        if (index !== -1) {
          tasks[index] = taskData;
        }
      } else {
        // If no ID exists, determine the new ID and add as a new task
        const newId = tasks.length > 0 ? Math.max(...tasks.map((task: { id: number }) => task.id)) + 1 : 1;
        taskData.id = newId;
        tasks.push(taskData);
      }
  
      // Save the updated data back to session storage
      sessionStorage.setItem('taskData', JSON.stringify(tasks));
    
      // Navigate to another page or reset the form if necessary
      this.router.navigate(['home']);
      this.taskForm.reset();
    }
  }
  
  
  
  


}
