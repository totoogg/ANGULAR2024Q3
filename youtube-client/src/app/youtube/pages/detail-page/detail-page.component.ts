import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailPageComponent {}
