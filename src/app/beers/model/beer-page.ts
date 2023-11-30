import { Beer } from './beer';

export interface BeerPage {
  beers: Beer[];
  totalElements: number;
  totalPages?: number;
}
