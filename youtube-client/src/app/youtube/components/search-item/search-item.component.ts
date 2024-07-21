import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IItem } from '../../models/search-item.model';
import { SliceTitlePipe } from '../../pipes/slice-title.pipe';
import { ColorLineDirective } from '../../directives/color-line.directive';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';

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

  randomDislike(): number {
    if (this.video) {
      return Math.round(Number(this.video.statistics.likeCount) / 100);
    }
    return 0;
  }
}
