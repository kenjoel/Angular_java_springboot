import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { Employee } from './employee';
import { EmployeeService } from "./employee.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public employee: Employee[] = [];

  constructor(private service: EmployeeService){}

  public getEmployees(){
    this.service.getEmployees().subscribe((response: Employee[]) => {
      this.employee = response
    },
    (err: HttpErrorResponse) => {
      alert(err.message)
    }
    )
  }


  ngOnInit(): void {
    this.getEmployees()
  }

}
