import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDateCustom',
  standalone: true,
})
export class FormatDateCustomPipe implements PipeTransform {
  transform(value: string): string {
    const date = new Date(value);

    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    return `${days[date.getDay()]}, ${
      month[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
    // Thursday, December 20, 2019
  }
}
