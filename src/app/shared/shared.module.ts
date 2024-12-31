import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './directives/highlight.directive';
import { FormatDatePipe } from './pipes/format-date.pipe';



@NgModule({
  declarations: [
    HighlightDirective,
    FormatDatePipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
