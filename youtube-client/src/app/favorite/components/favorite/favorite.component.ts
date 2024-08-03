import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FavoriteSelectors from '../../../core/store/selectors/core.selector';
import * as FavoriteActions from '../../../core/store/actions/core.action';
import { VideosService } from '../../../youtube/services/videos.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteComponent implements OnInit {
  constructor(
    private store: Store,
    public videoService: VideosService,
  ) {}

  loading$ = this.store.select(FavoriteSelectors.selectGetIsLoading);

  ngOnInit(): void {
    this.store.dispatch(FavoriteActions.updateFavoriteData());
  }
}
