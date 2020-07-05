export interface ResponseData {
  data: object[] | object;
  message: string;
  success: boolean;
}

export interface PaginateData {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
  items: object[];
}

export interface ConfigPaginate {
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
}

export interface DataFilterPaginate {
  per_page_data: number[];
  data_filter: string[];
  filter_query: string;
  params: ParamsFilterPaginate;
}

export interface ParamsFilterPaginate {
  per_page: number;
  sort_by: string;
  sort_order: string;
  page: number;
}
