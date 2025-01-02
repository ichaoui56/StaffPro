import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightDirective } from './highlight.directive';

@Component({
  standalone: false,
  template: `<div appHighlight>Test</div>`
})
class TestComponent {}

describe('HighlightDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, HighlightDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const element = fixture.debugElement.nativeElement.querySelector('div');
    const elementRef = new ElementRef(element);
    const directive = new HighlightDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
