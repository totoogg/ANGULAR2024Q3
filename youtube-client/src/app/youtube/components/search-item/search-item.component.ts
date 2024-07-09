import { Component, Input } from '@angular/core';
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
}
