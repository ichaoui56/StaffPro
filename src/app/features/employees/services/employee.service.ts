import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly STORAGE_KEY = 'employees';
  private employeesSubject = new BehaviorSubject<Employee[]>(this.loadEmployees());

  addEmployee(employee: Employee): void {
    const employees = this.getEmployees();
    employees.push(employee);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(employees));
    this.employeesSubject.next(employees);
  }

  getEmployees(): Employee[] {
    return this.loadEmployees();
  }

  getEmployeesObservable(): Observable<Employee[]> {
    return this.employeesSubject.asObservable();
  }

  private loadEmployees(): Employee[] {
    const employees = localStorage.getItem(this.STORAGE_KEY);
    return employees ? JSON.parse(employees) : [];
  }
}
