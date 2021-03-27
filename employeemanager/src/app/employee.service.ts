import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiService = ""

  constructor(private http: HttpClient) { }

  //Gets
  getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiService}/employee/all`)
  }

  getEmployeeById(id:number){
    return this.http.get(`${this.apiService}/find/${id}`)
  }


  //Posts
  createEmployee(employee: Employee){
    return this.http.post(`${this.apiService}/add`, employee)
    .subscribe(() => { console.log(employee) })
  }


}
