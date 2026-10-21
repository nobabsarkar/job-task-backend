export interface IQuery {
  page?: string;
  limit?: string;
  sortOrder?: string;
  sortBy?: string;

  [key: string]: any;
}
