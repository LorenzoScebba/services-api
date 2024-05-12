export interface PaginatedResponse<T> {
  pagination: {
    skip: number;
    take: number;
    totalData: number;
  };
  data: T;
}
