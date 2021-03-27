import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiService = ""

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any>{
    return this.http.get<any>(`${this.apiService}/employee/all`)
  }

  getEmployeeById(id:Number){
    return this.http.get(`${this.apiService}/find/${id}`)
  }


}
