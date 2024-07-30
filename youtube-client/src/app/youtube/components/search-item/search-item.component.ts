import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IItem } from '../../models/search-item.model';
import { VideosService } from '../../services/videos.service';
import { ICustomCard } from '../../../admin/models/customCard.model';
import * as CustomAction from '../../../redux/actions/custom.action';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchItemComponent implements OnInit {
  @Input() video: IItem | ICustomCard | null = null;

  videoItem: IItem | null = null;

  customCard: ICustomCard | null = null;

  constructor(
    private router: Router,
    private videoService: VideosService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    if (this.video && 'kind' in this.video) {
      this.videoItem = this.video;
    }
    if (this.video && 'videoLink' in this.video) {
      this.customCard = this.video;
    }
  }

  handleClickButton() {
    if (this.video?.id) {
      this.videoService.cleanVideo();
      this.router.navigate(['main', this.video?.id]);
    }
  }

  handleClickButtonRemove() {
    if (this.customCard) {
      this.store.dispatch(
        CustomAction.removeCustomCard({ id: this.customCard.id }),
      );
    }
  }

  randomDislike(): number {
    if (this.video && 'kind' in this.video) {
      return Math.round(Number(this.video.statistics.likeCount) / 100);
    }
    return 0;
  }
}
