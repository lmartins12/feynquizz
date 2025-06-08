import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ButtonModal } from '../../../core';

@Component({
  selector: 'app-modal-generic',
  templateUrl: './modal-generic.component.html',
  styleUrls: ['./modal-generic.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalGenericComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() buttons: ButtonModal[] = [];
  @Input() isOpen: boolean = false;

  @Output() modalClosed = new EventEmitter<void>();
  @Output() buttonClicked = new EventEmitter<number>();

  protected closeModal(): void {
    this.modalClosed.emit();
  }

  protected clickButton(index: number): void {
    const button = this.buttons[index];
    if (button?.handler) {
      button.handler();
    }
    this.buttonClicked.emit(index);
    this.closeModal();
  }
}
