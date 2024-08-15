import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { FindService } from '../../../core/services/find.service';
import { FindWordService } from '../../../core/services/find-word.service';
import { SortVideoService } from '../../../core/services/sort-video.service';
import * as YoutubeActions from '../../../redux/actions/youtube.action';
import * as AppSelectors from '../../../redux/selectors/app.selector';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsComponent {
  currentPage$ = this.store.select(AppSelectors.selectGetPage);

  loading$ = this.store.select(AppSelectors.selectGetIsLoading);

  showCard$ = this.store.select(AppSelectors.selectGetShowVideos);

  fullCards$ = this.store.select(AppSelectors.selectGetAllVideos);

  total$ = this.store.select(AppSelectors.selectGetTotal);

  constructor(
    public findService: FindService,
    public findWordService: FindWordService,
    public sortVideoService: SortVideoService,
    private store: Store,
  ) {}

  handlePageEvent(e: PageEvent) {
    if (!e.previousPageIndex || e.pageIndex > e.previousPageIndex) {
      this.store.dispatch(
        YoutubeActions.updateYoutubePageNext({
          page: e.pageIndex,
        }),
      );
    }

    if (e.previousPageIndex && e.pageIndex < e.previousPageIndex) {
      this.store.dispatch(
        YoutubeActions.updateYoutubePagePrev({
          page: e.pageIndex,
        }),
      );
    }
  }
}
