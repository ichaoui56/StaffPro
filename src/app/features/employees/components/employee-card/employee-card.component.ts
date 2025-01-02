import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-card',
  standalone: false,
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent {
  @Input() employee!: Employee;

  @Output() deleteEmployee = new EventEmitter<string>();

  constructor(private router: Router) {}

  onEditEmployee(id: string): void {
    this.router.navigate(['/employees/edit', id]);
  }

  onDeleteEmployee(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteEmployee.emit(id);
      }
    });
  }
}
