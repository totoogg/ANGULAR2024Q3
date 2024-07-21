import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { VideosService } from '../../../youtube/services/videos.service';

@Component({
  selector: 'app-custom-button',
  standalone: true,
  imports: [],
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomButtonComponent {
  @Input() id: string | undefined = '';

  constructor(
    private router: Router,
    private videoService: VideosService,
  ) {}

  handleClickButton() {
    if (this.id) {
      this.videoService.cleanVideo();
      this.router.navigate(['main', this.id]);
    }
  }
}
