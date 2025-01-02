import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import Swal from 'sweetalert2';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  standalone: false,
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  employees: Employee[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to employees list updates
    this.employeeService.employees$
      .pipe(takeUntil(this.destroy$))
      .subscribe(employees => {
        this.employees = employees;
      });

    // Subscribe to employee actions for notifications
    this.employeeService.employeeAction$
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ action, employee }) => {
        let message = '';
        switch (action) {
          case 'deleted':
            message = `${employee.firstName} ${employee.lastName} has been deleted`;
            break;
          case 'updated':
            message = `${employee.firstName} ${employee.lastName}'s information has been updated`;
            break;
          case 'added':
            message = `${employee.firstName} ${employee.lastName} has been added`;
            break;
        }
        
        if (message) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: message,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addNewEmployee(): void {
    this.router.navigate(['/employees/new']);
  }

  handleDeleteEmployee(id: string): void {
    this.employeeService.deleteEmployee(id);
  }
}
