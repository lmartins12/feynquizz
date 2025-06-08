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
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Input() currentPage: number = 1;

  @Output() pageChanged = new EventEmitter<number>();
  @Output() paginationInfo = new EventEmitter<PaginationInfo>();

  protected readonly Math = Math;

  protected readonly totalPages = computed(() => Math.ceil(this.totalItems / this.itemsPerPage));

  protected readonly hasPreviousPage = computed(() => this.currentPage > 1);

  protected readonly hasNextPage = computed(() => this.currentPage < this.totalPages());

  protected readonly visiblePages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage;
    const pages: number[] = [];

    if (total <= 5) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 3) {
        pages.push(1, 2, 3, 4, 5);
      } else if (current >= total - 2) {
        for (let i = total - 4; i <= total; i++) {
          pages.push(i);
        }
      } else {
        for (let i = current - 2; i <= current + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  });

  protected goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages() && page !== this.currentPage) {
      this.pageChanged.emit(page);
      this.emitInfo(page);
    }
  }

  protected previousPage(): void {
    if (this.hasPreviousPage()) {
      this.goToPage(this.currentPage - 1);
    }
  }

  protected nextPage(): void {
    if (this.hasNextPage()) {
      this.goToPage(this.currentPage + 1);
    }
  }

  private emitInfo(page: number): void {
    this.paginationInfo.emit({
      currentPage: page,
      totalPages: this.totalPages(),
      totalItems: this.totalItems,
      itemsPerPage: this.itemsPerPage,
    });
  }
}
