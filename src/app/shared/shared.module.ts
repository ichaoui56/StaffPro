import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { HighlightDirective } from './directives/highlight.directive';

@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    HighlightDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavComponent,
    FooterComponent,
    HighlightDirective
  ]
})
export class SharedModule { }
