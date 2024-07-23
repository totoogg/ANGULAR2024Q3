import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

  private sortPush = new BehaviorSubject<ISort>({
    activeSortDate: false,
    ascDate: false,
    descDate: true,
    activeSortView: false,
    ascView: false,
    descView: true,
  });

  sortPush$ = this.sortPush.asObservable();

  changeSortOption(obj: ISort) {
    this.sort = { ...obj };

    this.sortPush.next({ ...obj });
  }
}
