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
  @Input() titulo: string = '';
  @Input() mensagem: string = '';
  @Input() botoes: ButtonModal[] = [];
  @Input() isOpen: boolean = false;

  @Output() modalFechado = new EventEmitter<void>();
  @Output() botaoClicado = new EventEmitter<number>();

  protected fecharModal(): void {
    this.modalFechado.emit();
  }

  protected clicarBotao(index: number): void {
    const botao = this.botoes[index];
    if (botao?.handler) {
      botao.handler();
    }
    this.botaoClicado.emit(index);
    this.fecharModal();
  }
}
