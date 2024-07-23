import { ChangeDetectionStrategy, Component } from '@angular/core';
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
export class SearchResultsComponent {
  constructor(
    public videoService: VideosService,
    public findService: FindService,
    public findWordService: FindWordService,
    public sortVideoService: SortVideoService,
  ) {}
}
