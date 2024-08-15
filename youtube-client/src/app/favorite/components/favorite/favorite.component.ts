import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FavoriteSelectors from '../../../core/redux/selectors/core.selector';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteComponent {
  constructor(
    private store: Store,
  ) {}

  favorite$ = this.store.select(FavoriteSelectors.selectGetFavoriteVideos);
}
