import {
  Directive, ElementRef, Input, OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appColorLine]',
  standalone: true,
})
export class ColorLineDirective implements OnInit {
  @Input() publishedAt = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const time = this.getTimeDifferent();

    if (time < 7) {
      this.renderer.addClass(this.el.nativeElement, 'less-7-days');
    } else if (time >= 7 && time < 31) {
      this.renderer.addClass(this.el.nativeElement, 'to-7-day-from-1-month');
    } else if (time >= 31 && time < 181) {
      this.renderer.addClass(this.el.nativeElement, 'to-1-from-6-month');
    } else {
      this.renderer.addClass(this.el.nativeElement, 'more-6-month');
    }
  }

  getTimeDifferent() {
    return (
      (new Date().getTime() - new Date(this.publishedAt).getTime()) / 86400000
    );
  }
}
