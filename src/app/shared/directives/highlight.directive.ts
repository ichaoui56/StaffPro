import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: false
})
export class HighlightDirective {
  private originalBoxShadow: string;
  private originalTransform: string;
  private originalBackground: string;

  constructor(private el: ElementRef) {
    this.originalBoxShadow = this.el.nativeElement.style.boxShadow;
    this.originalTransform = this.el.nativeElement.style.transform;
    this.originalBackground = this.el.nativeElement.style.backgroundColor;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.reset();
  }

  private highlight() {
    this.el.nativeElement.style.boxShadow = '0 10px 20px rgba(52, 152, 219, 0.2), 0 6px 6px rgba(52, 152, 219, 0.1)';
    this.el.nativeElement.style.transform = 'translateY(-5px)';
    this.el.nativeElement.style.backgroundColor = '#e3f2fd';
    this.el.nativeElement.style.transition = 'all 0.3s ease';
  }

  private reset() {
    this.el.nativeElement.style.boxShadow = this.originalBoxShadow;
    this.el.nativeElement.style.transform = this.originalTransform;
    this.el.nativeElement.style.backgroundColor = this.originalBackground;
  }
}
