import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VideosService } from '../../services/videos.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private activeRouter: ActivatedRoute,
    public videoService: VideosService,
  ) {}

  videoServiceIdSubscription: Subscription | undefined;

  videoServiceVideoSubscription: Subscription | undefined;

  ngOnInit(): void {
    const id = this.activeRouter.snapshot.paramMap.get('id') as string;
    this.videoServiceIdSubscription = this.videoService.getById(id).subscribe();
    this.videoServiceVideoSubscription = this.videoService.video.subscribe(() => {
      this.videoService.loadingChange(false);
      if (!this.videoService.video) {
        this.router.navigate(['notFound']);
      }
    });
  }

  handleClickBack() {
    this.router.navigate(['main']);
  }

  randomDislike(str?: string) {
    if (str) {
      return Math.round(Number(str) / 100);
    }
    return 0;
  }

  ngOnDestroy() {
    this.videoServiceVideoSubscription?.unsubscribe();
    this.videoServiceIdSubscription?.unsubscribe();
  }
}
