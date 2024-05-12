export type SortDirection = 'asc' | 'desc';

export class SortBy {
  field: string;
  direction: SortDirection;

  constructor(field: string, direction: SortDirection) {
    this.field = field;
    this.direction = direction;
  }
}
