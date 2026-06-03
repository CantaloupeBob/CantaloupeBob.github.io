export type Theme = 'light' | 'dark';

export interface LinkItem {
  label: string;
  href: string;
  external?: boolean;
  description?: string;
}
