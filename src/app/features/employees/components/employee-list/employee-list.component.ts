import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-list',
  standalone:false,
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeService.getEmployeesObservable().subscribe(employees => {
      this.employees = employees;
    });
  }

  addNewEmployee(): void {
    this.router.navigate(['/employees/new']);
  }

  handleDeleteEmployee(id: string): void {
    this.employeeService.deleteEmployee(id);
    Swal.fire({
      icon: 'success',
      title: 'Deleted!',
      text: 'Employee has been deleted.',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  }
}
