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

// Interfaces movidas para core/models/ui.models.ts
import { SortOption, AppliedFilter } from '../../../core';

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
  @Input() sortOptions: SortOption[] = [];
  @Input() selectedSort: string = '';
  @Input() searchValue: string = '';

  @Output() searchChanged = new EventEmitter<string>();
  @Output() sortChanged = new EventEmitter<string>();
  @Output() filterApplied = new EventEmitter<AppliedFilter>();

  protected readonly searchTerm = signal<string>('');
  protected readonly currentSort = signal<string>('');

  ngOnInit(): void {
    this.searchTerm.set(this.searchValue);
    this.currentSort.set(this.selectedSort);
  }

  protected changeSearch(event: any): void {
    const value = event.target.value;
    this.searchTerm.set(value);
    this.searchChanged.emit(value);
    this.emitFilter();
  }

  protected changeSort(event: any): void {
    const value = event.detail.value;
    this.currentSort.set(value);
    this.sortChanged.emit(value);
    this.emitFilter();
  }

  protected clearSearch(): void {
    this.searchTerm.set('');
    this.searchChanged.emit('');
    this.emitFilter();
  }

  private emitFilter(): void {
    this.filterApplied.emit({
      search: this.searchTerm(),
      sort: this.currentSort(),
    });
  }
}
