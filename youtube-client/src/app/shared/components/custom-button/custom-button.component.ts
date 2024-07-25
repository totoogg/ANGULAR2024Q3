import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomButtonComponent {
  @Input() disabled: boolean = false;

  @Input() type: string = 'button';

  @Output() clickCustomEvent = new EventEmitter<string>();

  handleClickButton() {
    this.clickCustomEvent.emit('click');
  }
}
