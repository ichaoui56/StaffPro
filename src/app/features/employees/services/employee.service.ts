import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly STORAGE_KEY = 'employees';

  addEmployee(employee: Employee): void {
    const employees = this.getEmployees();
    employees.push(employee);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(employees));
  }

  private getEmployees(): Employee[] {
    const employees = localStorage.getItem(this.STORAGE_KEY);
    return employees ? JSON.parse(employees) : [];
  }
}
