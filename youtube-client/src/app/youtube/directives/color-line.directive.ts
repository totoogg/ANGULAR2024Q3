import {
  Directive, ElementRef, Input, OnInit,
} from '@angular/core';

@Directive({
  selector: '[appColorLine]',
  standalone: true,
})
export class ColorLineDirective implements OnInit {
  @Input() publishedAt = '';

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const time = this.getTimeDifferent();

    if (time < 7) {
      this.el.nativeElement.classList.add('less-7-days');
    } else if (time >= 7 && time < 31) {
      this.el.nativeElement.classList.add('to-7-day-from-1-month');
    } else if (time >= 31 && time < 181) {
      this.el.nativeElement.classList.add('to-1-from-6-month');
    } else {
      this.el.nativeElement.classList.add('more-6-month');
    }
  }

  getTimeDifferent() {
    return (
      (new Date().getTime() - new Date(this.publishedAt).getTime()) / 86400000
    );
  }
}
