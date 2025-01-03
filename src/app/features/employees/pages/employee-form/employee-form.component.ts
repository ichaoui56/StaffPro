import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-form',
  standalone: false,
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit, OnDestroy {
  employeeForm: FormGroup;
  maxDate: string;
  isEditMode = false;
  employeeId?: string;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.maxDate = new Date().toISOString().split('T')[0];
    this.employeeForm = this.createForm();
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.params.subscribe(params => {
        if (params['id']) {
          this.isEditMode = true;
          this.employeeId = params['id'];
          if (this.employeeId) {
            this.loadEmployee(this.employeeId);
          }
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z ]*')]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      position: ['', [Validators.required, Validators.minLength(2)]],
      department: ['', [Validators.required, Validators.minLength(2)]],
      hireDate: ['', [Validators.required]]
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.employeeForm.get(controlName);
    if (control?.errors) {
      if (control.errors['required']) {
        return `${this.formatFieldName(controlName)} is required`;
      }
      if (control.errors['minlength']) {
        return `${this.formatFieldName(controlName)} must be at least ${control.errors['minlength'].requiredLength} characters`;
      }
      if (control.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (control.errors['pattern']) {
        if (controlName === 'email') {
          return 'Please enter a valid email address';
        }
        return `${this.formatFieldName(controlName)} can only contain letters`;
      }
    }
    return '';
  }

  private formatFieldName(fieldName: string): string {
    return fieldName
      .replace(/([A-Z])/g, ' $1') // Insert space before capital letters
      .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
  }

  validateField(fieldName: string) {
    const control = this.employeeForm.get(fieldName);
    if (control?.invalid && control?.touched) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: this.getErrorMessage(fieldName),
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
    }
  }

  private loadEmployee(id: string): void {
    const employee = this.employeeService.getEmployeeById(id);
    if (employee) {
      this.employeeForm.patchValue({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        position: employee.position,
        department: employee.department,
        hireDate: new Date(employee.hireDate).toISOString().split('T')[0]
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Employee not found!'
      }).then(() => {
        this.router.navigate(['/employees']);
      });
    }
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const formValue = this.employeeForm.value;
      const employeeData = {
        id: this.isEditMode ? this.employeeId! : uuidv4(),
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        position: formValue.position,
        department: formValue.department,
        hireDate: new Date(formValue.hireDate)
      };

      if (this.isEditMode) {
        this.employeeService.updateEmployee(employeeData);
      } else {
        this.employeeService.addEmployee(employeeData);
      }

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Employee ${this.isEditMode ? 'updated' : 'added'} successfully`,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      }).then(() => {
        this.router.navigate(['/employees']);
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Form Invalid',
        text: 'Please check all required fields',
        confirmButtonText: 'Ok'
      });
      
      // Object.keys(this.employeeForm.controls).forEach(key => {
      //   const control = this.employeeForm.get(key);
      //   if (control?.invalid) {
      //     control.markAsTouched();
      //   }
      // });
    }
  }

  onCancel(): void {
    this.router.navigate(['/employees']);
  }
}
