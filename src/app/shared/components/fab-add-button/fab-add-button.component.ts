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
  @Input() icone: string = 'add';
  @Input() cor: string = 'primary';
  @Input() posicao: 'bottom' | 'top' = 'bottom';
  @Input() lado: 'start' | 'end' | 'center' = 'end';
  @Input() disabled: boolean = false;

  @Output() clicado = new EventEmitter<void>();

  protected clicar(): void {
    if (!this.disabled) {
      this.clicado.emit();
    }
  }
}
