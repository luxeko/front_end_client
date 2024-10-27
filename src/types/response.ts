export type Response<T = any> = {
  code: number;
  status: string;
  response: T | T[];
};

export type ResponsePaginate = {
  current_page?: number;
  first_page_url?: string;
  last_page_url?: string;
  next_page_url?: string;
  prev_page_url?: string;
  path?: string;
  from?: number;
  last_page?: number;
  per_page?: number;
  to?: number;
  total?: number;
  links?: LinksPaginate[];
};

type LinksPaginate = {
  url?: string;
  label?: string;
  active?: string;
};
