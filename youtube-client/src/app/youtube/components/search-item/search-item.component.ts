import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IItem } from '../../models/search-item.model';
import { VideosService } from '../../services/videos.service';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchItemComponent {
  @Input() video: IItem | null = null;

  constructor(
    private router: Router,
    private videoService: VideosService,
  ) {}

  handleClickButton() {
    if (this.video?.id) {
      this.videoService.cleanVideo();
      this.router.navigate(['main', this.video?.id]);
    }
  }

  randomDislike(): number {
    if (this.video) {
      return Math.round(Number(this.video.statistics.likeCount) / 100);
    }
    return 0;
  }
}
