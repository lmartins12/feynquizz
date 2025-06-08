import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-fab-add-button',
  templateUrl: './fab-add-button.component.html',
  styleUrls: ['./fab-add-button.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabAddButtonComponent {
  @Input() icon: string = 'add';
  @Input() color: string = 'primary';
  @Input() position: 'bottom' | 'top' = 'bottom';
  @Input() side: 'start' | 'end' | 'center' = 'end';
  @Input() disabled: boolean = false;

  @Output() clicked = new EventEmitter<void>();

  protected click(): void {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}
