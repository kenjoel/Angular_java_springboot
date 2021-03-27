import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiService = environment.base_url;

  constructor(private http: HttpClient) { }

  //Gets
  public getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiService}/employee/all`)
  }

  public getEmployeeById(id:number){
    return this.http.get(`${this.apiService}/find/${id}`)
  }


  //Posts
  public createEmployee(employee: Employee): Observable<Employee>{
    return this.http.post<Employee>(`${this.apiService}/employee/add`, employee)
  }

  public updateEmployee(employee: Employee): Observable<Employee>{
    return this.http.put<Employee>(`${this.apiService}/employee/update`, employee)
  }

  //Delete
  public deleteEmployee(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiService}/employee/delete/${id}`)
  }


}
