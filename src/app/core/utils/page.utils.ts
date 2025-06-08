import { computed, Signal } from '@angular/core';
import { PageFilters, PaginationConfig } from '../models';

export function createPaginatedData<T>(
  data: Signal<T[]>,
  filters: PageFilters,
  pagination: PaginationConfig,
  searchFields: (keyof T)[],
  sortFields: Record<string, keyof T>,
) {
  const filteredData = computed(() => {
    let result = data();
    const search = filters.search();
    const sort = filters.sort();

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
      result = [...result].sort((a, b) => {
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
  });

  const totalItems = computed(() => filteredData().length);

  const totalPages = computed(() => Math.ceil(totalItems() / pagination.itemsPerPage));

  const currentPageData = computed(() => {
    const data = filteredData();
    const page = pagination.totalItems(); // Usando como página atual
    const start = (page - 1) * pagination.itemsPerPage;
    const end = start + pagination.itemsPerPage;
    return data.slice(start, end);
  });

  return {
    filteredData,
    currentPageData,
    totalItems,
    totalPages,
  };
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

export function formatScore(score: number | null): string {
  if (score === null || score === undefined) {
    return 'Não avaliado';
  }
  return `${score.toFixed(1)}/10`;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
