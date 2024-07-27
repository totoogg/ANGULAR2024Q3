import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { VideosService } from '../../services/videos.service';
import { FindService } from '../../../core/services/find.service';
import { FindWordService } from '../../../core/services/find-word.service';
import { SortVideoService } from '../../../core/services/sort-video.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsComponent implements OnDestroy {
  videoServiceAllSubscription: Subscription | undefined;

  currentPage = 0;

  constructor(
    public videoService: VideosService,
    public findService: FindService,
    public findWordService: FindWordService,
    public sortVideoService: SortVideoService,
  ) {}

  handlePageEvent(e: PageEvent) {
    this.currentPage = e.pageIndex;
    this.videoService.loadingChange(true);
    if (!e.previousPageIndex || e.pageIndex > e.previousPageIndex) {
      this.videoServiceAllSubscription = this.videoService
        .getAll(
          this.findService.value.trim(),
          this.videoService.responseVideo?.nextPageToken,
        )
        .subscribe(() => {
          this.videoService.loadingChange(false);
        });
    }

    if (e.previousPageIndex && e.pageIndex < e.previousPageIndex) {
      this.videoServiceAllSubscription = this.videoService
        .getAll(
          this.findService.value.trim(),
          this.videoService.responseVideo?.prevPageToken,
        )
        .subscribe(() => {
          this.videoService.loadingChange(false);
        });
    }
  }

  ngOnDestroy(): void {
    this.videoServiceAllSubscription?.unsubscribe();
  }
}
