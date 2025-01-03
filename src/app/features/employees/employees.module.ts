import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeesRoutingModule } from './employees-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { EmployeesComponent } from './employees.component';
import { EmployeeFormComponent } from './pages/employee-form/employee-form.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { HireDatePipe } from '../../shared/pipes/hire-date.pipe';

@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeeFormComponent,
    EmployeeListComponent,
    EmployeeCardComponent,
    HireDatePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeesRoutingModule,
    SharedModule
  ]
})
export class EmployeesModule { }
