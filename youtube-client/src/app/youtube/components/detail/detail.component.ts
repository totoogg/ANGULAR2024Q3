import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VideosService } from '../../services/videos.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent implements OnInit {
  constructor(
    private router: Router,
    private activeRouter: ActivatedRoute,
    public videoService: VideosService,
  ) {}

  ngOnInit(): void {
    const id = this.activeRouter.snapshot.paramMap.get('id') as string;
    this.videoService.getById(id).subscribe();
    this.videoService.video.subscribe(() => {
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
}
