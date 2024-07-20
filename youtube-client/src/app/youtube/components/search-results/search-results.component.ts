import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchItemComponent } from '../search-item/search-item.component';
import { FilterVideosPipe } from '../../pipes/filter-videos.pipe';
import { SortVideosPipe } from '../../pipes/sort-videos.pipe';
import { VideosService } from '../../services/videos.service';
import { FindService } from '../../../core/services/find.service';
import { FindWordService } from '../../../core/services/find-word.service';
import { SortVideoService } from '../../../core/services/sort-video.service';

@Component({
  selector: 'app-search-results',
  standalone: true,
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
  imports: [SearchItemComponent, FilterVideosPipe, SortVideosPipe, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsComponent {
  videoService = inject(VideosService);

  findService = inject(FindService);

  findWordService = inject(FindWordService);

  sortVideoService = inject(SortVideoService);

  changeDetection = inject(ChangeDetectorRef);
}
