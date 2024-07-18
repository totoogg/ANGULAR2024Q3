import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
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
})
export class SearchItemComponent {
  @Input() video!: IItem;

  router = inject(Router);

  handleClickButton(id: string) {
    this.router.navigate(['main', id]);
  }

  randomDislike() {
    return Math.round(Number(this.video.statistics.likeCount) / 100);
  }
}
