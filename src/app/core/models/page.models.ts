import { WritableSignal } from '@angular/core';

export interface PageState<T = any> {
  loading: WritableSignal<boolean>;
  error: WritableSignal<string | null>;
  data: WritableSignal<T[]>;
  currentPage: WritableSignal<number>;
}

export interface PageFilters {
  search: WritableSignal<string>;
  sort: WritableSignal<string>;
}

export interface PaginationConfig {
  totalItems: WritableSignal<number>;
  itemsPerPage: number;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}
