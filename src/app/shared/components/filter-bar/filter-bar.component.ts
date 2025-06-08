import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

export interface OpcaoOrdenacao {
  valor: string;
  texto: string;
}

export interface FiltroAplicado {
  busca: string;
  ordenacao: string;
}

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterBarComponent {
  @Input() placeholder: string = 'Buscar...';
  @Input() opcoesOrdenacao: OpcaoOrdenacao[] = [];
  @Input() ordenacaoSelecionada: string = '';
  @Input() valorBusca: string = '';

  @Output() buscaAlterada = new EventEmitter<string>();
  @Output() ordenacaoAlterada = new EventEmitter<string>();
  @Output() filtroAplicado = new EventEmitter<FiltroAplicado>();

  protected readonly termoBusca = signal<string>('');
  protected readonly ordenacaoAtual = signal<string>('');

  ngOnInit(): void {
    this.termoBusca.set(this.valorBusca);
    this.ordenacaoAtual.set(this.ordenacaoSelecionada);
  }

  protected alterarBusca(evento: any): void {
    const valor = evento.target.value;
    this.termoBusca.set(valor);
    this.buscaAlterada.emit(valor);
    this.emitirFiltro();
  }

  protected alterarOrdenacao(evento: any): void {
    const valor = evento.detail.value;
    this.ordenacaoAtual.set(valor);
    this.ordenacaoAlterada.emit(valor);
    this.emitirFiltro();
  }

  protected limparBusca(): void {
    this.termoBusca.set('');
    this.buscaAlterada.emit('');
    this.emitirFiltro();
  }

  private emitirFiltro(): void {
    this.filtroAplicado.emit({
      busca: this.termoBusca(),
      ordenacao: this.ordenacaoAtual(),
    });
  }
}
