import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Button, error } from 'protractor';
import { Employee } from './employee';
import { EmployeeService } from "./employee.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public employees: Employee[] = [];
  editEmployee: Employee | undefined;
  
  fireEmployee: Employee | undefined;

  constructor(private service: EmployeeService){}

  public getEmployees(){
    this.service.getEmployees().subscribe((response: Employee[]) => {
      this.employees = response
    },
    (err: HttpErrorResponse) => {
      alert(err.message)
    }
    )
  }

  public openModal(employee: Employee| undefined, mode: string): void{
    const container = document.getElementById("main-container");

    const button = document.createElement("button")
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-toggle", "modal");

    if(mode === "add"){
      button.setAttribute("data-target", "#addEmployeeModal")
    }

    if(mode === "edit"){
      this.editEmployee = employee
      button.setAttribute("data-target", "#updateEmployeeModal")
    }


    if(mode === "delete"){
      this.fireEmployee = employee
      button.setAttribute("data-target", "#deleteEmployeeModal")
    }

    container?.appendChild(button);
    button.click();
  }


  public onAddEmployee(addForm: NgForm): void{
    document.getElementById("add-employee-form")?.click();
    this.service.createEmployee(addForm.value)
    .subscribe(
      (res: Employee) => {
        console.log(res)
        this.getEmployees()
      },
      (err: HttpErrorResponse) => {
        alert(err.message)
      }
      )
      addForm.reset();  
  }


  public letsUpdate(employee: Employee):void{
    this.service.updateEmployee(employee)
    .subscribe(
      (res: Employee) => {
        console.log(res)
        this.getEmployees()
      },
      (err: HttpErrorResponse) => {
        alert(err.message)
      }
      )
  }


  public deteleEmployee(id:number | undefined): void{
    this.service.deleteEmployee(id!)
    .subscribe(() => {
      alert("Employee Successfully fired")
      this.getEmployees();
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
