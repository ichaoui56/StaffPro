import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly STORAGE_KEY = 'employees';
  private employeesSubject = new BehaviorSubject<Employee[]>(this.loadEmployees());

  addEmployee(employee: Employee): void {
    const employees = this.getEmployees();
    const employeeWithId = {
      ...employee,
      id: uuidv4()
    };
    employees.push(employeeWithId);
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

  deleteEmployee(id: string): void {
    const employees = this.getEmployees();
    const filteredEmployees = employees.filter(employee => employee.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredEmployees));
    this.employeesSubject.next(filteredEmployees);
  }

  getEmployeeById(id: string): Employee | undefined {
    const employees = this.getEmployees();
    return employees.find(emp => emp.id === id);
  }

  updateEmployee(updatedEmployee: Employee): void {
    const employees = this.getEmployees();
    const index = employees.findIndex(emp => emp.id === updatedEmployee.id);
    if (index !== -1) {
      employees[index] = updatedEmployee;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(employees));
      this.employeesSubject.next(employees);
    }
  }
}
