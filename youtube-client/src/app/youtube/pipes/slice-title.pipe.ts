import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceTitle',
  standalone: true,
})
export class SliceTitlePipe implements PipeTransform {
  transform(value: string, maxLength: number = 40): string {
    if (value.length > maxLength) {
      return `${value.substring(0, maxLength)}...`;
    }
    return value;
  }
}
