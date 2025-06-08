import { Injectable, signal } from '@angular/core';
import { PageState, PageFilters, PaginationConfig } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PageUtilsService {
  createPageState<T>(): PageState<T> {
    return {
      loading: signal<boolean>(false),
      error: signal<string | null>(null),
      data: signal<T[]>([]),
      currentPage: signal<number>(1),
    };
  }

  createPageFilters(): PageFilters {
    return {
      search: signal<string>(''),
      sort: signal<string>(''),
    };
  }

  createPaginationConfig(itemsPerPage: number = 10): PaginationConfig {
    return {
      totalItems: signal<number>(0),
      itemsPerPage,
    };
  }

  async executeOperation<T>(
    state: PageState,
    operation: () => Promise<T>,
    errorMessage: string = 'Erro ao executar operação',
  ): Promise<T | null> {
    try {
      state.loading.set(true);
      state.error.set(null);
      return await operation();
    } catch (error) {
      console.error('Erro na operação:', error);
      state.error.set(errorMessage);
      return null;
    } finally {
      state.loading.set(false);
    }
  }

  filterData<T>(
    data: T[],
    search: string,
    sort: string,
    searchFields: (keyof T)[],
    sortFields: Record<string, keyof T>,
  ): T[] {
    let result = [...data];

    if (search.trim()) {
      const searchTerm = search.toLowerCase().trim();
      result = result.filter((item) =>
        searchFields.some((field) => {
          const value = item[field];
          return value?.toString().toLowerCase().includes(searchTerm);
        }),
      );
    }

    if (sort && sortFields[sort]) {
      const field = sortFields[sort];
      result.sort((a, b) => {
        const valueA = a[field];
        const valueB = b[field];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return valueA.localeCompare(valueB);
        }

        if (valueA instanceof Date && valueB instanceof Date) {
          return valueB.getTime() - valueA.getTime();
        }

        return (valueA as any) - (valueB as any);
      });
    }

    return result;
  }

  paginateData<T>(data: T[], page: number, itemsPerPage: number): T[] {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  }

  calculateTotalPages(totalItems: number, itemsPerPage: number): number {
    return Math.ceil(totalItems / itemsPerPage);
  }
}
