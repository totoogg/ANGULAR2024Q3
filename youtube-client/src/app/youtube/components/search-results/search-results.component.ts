import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { VideosService } from '../../services/videos.service';
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
export class SearchResultsComponent implements OnInit {
  currentPage$ = this.store.select(AppSelectors.selectGetPage);

  loading$ = this.store.select(AppSelectors.selectGetIsLoading);

  showCard$ = this.store.select(AppSelectors.selectGetShowCards);

  fullCards$ = this.store.select(AppSelectors.selectGetFullCards);

  constructor(
    public videoService: VideosService,
    public findService: FindService,
    public findWordService: FindWordService,
    public sortVideoService: SortVideoService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(YoutubeActions.updateShowCards());
  }

  handlePageEvent(e: PageEvent) {
    if (!e.previousPageIndex || e.pageIndex > e.previousPageIndex) {
      this.store.dispatch(
        YoutubeActions.updateYoutubePageNext({
          page: e.pageIndex,
          tokenPage: this.videoService.responseVideo?.nextPageToken || '',
        }),
      );
    }

    if (e.previousPageIndex && e.pageIndex < e.previousPageIndex) {
      this.store.dispatch(
        YoutubeActions.updateYoutubePagePrev({
          page: e.pageIndex,
          tokenPage: this.videoService.responseVideo?.prevPageToken || '',
        }),
      );
    }
  }
}
