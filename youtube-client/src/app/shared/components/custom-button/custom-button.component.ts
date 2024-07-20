import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  standalone: true,
  imports: [],
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomButtonComponent {
}
