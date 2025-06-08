import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PaginationInfo } from '../../../core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input() totalItens: number = 0;
  @Input() itensPorPagina: number = 10;
  @Input() paginaAtual: number = 1;

  @Output() paginaAlterada = new EventEmitter<number>();
  @Output() infoPaginacao = new EventEmitter<PaginationInfo>();

  protected readonly Math = Math;

  protected readonly totalPaginas = computed(() =>
    Math.ceil(this.totalItens / this.itensPorPagina),
  );

  protected readonly temPaginaAnterior = computed(() => this.paginaAtual > 1);

  protected readonly temProximaPagina = computed(() => this.paginaAtual < this.totalPaginas());

  protected readonly paginasVisiveis = computed(() => {
    const total = this.totalPaginas();
    const atual = this.paginaAtual;
    const paginas: number[] = [];

    if (total <= 5) {
      for (let i = 1; i <= total; i++) {
        paginas.push(i);
      }
    } else {
      if (atual <= 3) {
        paginas.push(1, 2, 3, 4, 5);
      } else if (atual >= total - 2) {
        for (let i = total - 4; i <= total; i++) {
          paginas.push(i);
        }
      } else {
        for (let i = atual - 2; i <= atual + 2; i++) {
          paginas.push(i);
        }
      }
    }

    return paginas;
  });

  protected irParaPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas() && pagina !== this.paginaAtual) {
      this.paginaAlterada.emit(pagina);
      this.emitirInfo(pagina);
    }
  }

  protected paginaAnterior(): void {
    if (this.temPaginaAnterior()) {
      this.irParaPagina(this.paginaAtual - 1);
    }
  }

  protected proximaPagina(): void {
    if (this.temProximaPagina()) {
      this.irParaPagina(this.paginaAtual + 1);
    }
  }

  private emitirInfo(pagina: number): void {
    this.infoPaginacao.emit({
      currentPage: pagina,
      totalPages: this.totalPaginas(),
      totalItems: this.totalItens,
      itemsPerPage: this.itensPorPagina,
    });
  }
}
