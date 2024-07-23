import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IItem } from '../../models/search-item.model';
import { SliceTitlePipe } from '../../pipes/slice-title.pipe';
import { ColorLineDirective } from '../../directives/color-line.directive';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';
import { VideosService } from '../../services/videos.service';

@Component({
  selector: 'app-search-item',
  standalone: true,
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.scss',
  imports: [SliceTitlePipe, ColorLineDirective, CustomButtonComponent],
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
