import { Pipe, PipeTransform } from '@angular/core';
import { IItem } from '../search/search-item.model';
import { ISort } from '../models/ISort';

@Pipe({
  name: 'sortVideos',
  standalone: true,
})
export class SortVideosPipe implements PipeTransform {
  transform(products: IItem[], sort: ISort): IItem[] {
    if (!sort.activeSortDate && !sort.activeSortView) return products;
    if (sort.activeSortDate) {
      if (sort.ascDate) {
        return products.sort(
          (a, b) => new Date(a.snippet.publishedAt).getTime()
            - new Date(b.snippet.publishedAt).getTime(),
        );
      }
      return products.sort(
        (a, b) => new Date(b.snippet.publishedAt).getTime()
          - new Date(a.snippet.publishedAt).getTime(),
      );
    }
    if (sort.ascView) {
      return products.sort(
        (a, b) => Number(b.statistics.viewCount) - Number(a.statistics.viewCount),
      );
    }
    return products.sort(
      (a, b) => Number(a.statistics.viewCount) - Number(b.statistics.viewCount),
    );
  }
}
