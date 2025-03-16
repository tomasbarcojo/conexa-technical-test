export interface SwResponse<T> {
  count: number;
  next: number;
  previous: number;
  results: T[];
}
