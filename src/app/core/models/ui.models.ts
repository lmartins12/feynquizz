export interface ButtonModal {
  text: string;
  color?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger';
  handler?: () => void;
}

export interface SortOption {
  value: string;
  text: string;
}

export interface AppliedFilter {
  search: string;
  sort: string;
}
