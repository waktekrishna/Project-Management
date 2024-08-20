import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { task } from './task-list/task.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) {   }

  private url = 'assets/data.json';
  private passData = new BehaviorSubject<any>(null)


  getStudentRecords() {
    this.httpClient.get(this.url).subscribe((data: any) => {
      console.log("data",data);
    })
    return this.httpClient.get(this.url);
  }

  sendData(data : any) {
    this.passData.next(data)
  }

  getData(): Observable<any> {
    return this.passData.asObservable();
  }
}
