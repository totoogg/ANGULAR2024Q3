import { Component, Input, OnInit } from '@angular/core';
import { IItem } from '../search-item.model';
import { data } from '../../data/data';
import { SearchItemComponent } from '../search-item/search-item.component';
import { FilterVideosPipe } from '../../pipes/filter-videos.pipe';

@Component({
  selector: 'app-search-results',
  standalone: true,
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
  imports: [SearchItemComponent, FilterVideosPipe],
})
export class SearchResultsComponent implements OnInit {
  @Input() term!: string;

  videos: IItem[] = [];

  ngOnInit(): void {
    this.videos = data.items;
  }
}
