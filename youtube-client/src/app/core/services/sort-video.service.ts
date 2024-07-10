import { Injectable } from '@angular/core';
import { ISort } from '../../shared/models/ISort';

@Injectable({
  providedIn: 'root',
})
export class SortVideoService {
  sort: ISort = {
    activeSortDate: false,
    ascDate: false,
    descDate: true,
    activeSortView: false,
    ascView: false,
    descView: true,
  };

  changeSortOption(obj: ISort) {
    this.sort = { ...obj };
  }
}
