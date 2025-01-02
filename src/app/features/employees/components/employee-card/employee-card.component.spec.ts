import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EmployeeCardComponent } from './employee-card.component';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { HireDatePipe } from '../../../../shared/pipes/hire-date.pipe';

describe('EmployeeCardComponent', () => {
  let component: EmployeeCardComponent;
  let fixture: ComponentFixture<EmployeeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        EmployeeCardComponent,
        HighlightDirective,
        HireDatePipe
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeCardComponent);
    component = fixture.componentInstance;
    component.employee = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      position: 'Developer',
      department: 'IT',
      hireDate: new Date()
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
