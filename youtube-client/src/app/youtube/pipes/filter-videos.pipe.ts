import { Pipe, PipeTransform } from '@angular/core';
import { IItem } from '../models/search-item.model';

@Pipe({
  name: 'filterVideos',
  standalone: true,
})
export class FilterVideosPipe implements PipeTransform {
  transform(products: IItem[], search: string, findWord: string): IItem[] {
    if (search.length === 0) return products;
    return products.filter(
      (p) => p.snippet.title.toLowerCase().includes(search.toLowerCase())
        && (p.snippet.title.toLowerCase().includes(findWord.toLowerCase())
          || p.snippet.description.toLowerCase().includes(findWord.toLowerCase())),
    );
  }
}
