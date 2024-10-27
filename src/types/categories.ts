import { Response, ResponsePaginate } from '@/types/response';

export type Category = {
  id: string;
  category_name: string;
  image_path?: string;
  image_name?: string;
  description?: string;
  status: boolean;
  creator_id: string;
  parent_id?: string;
  created_at: string;
  updated_at?: string;
  deleted_at?: string;
  total_products_count?: number;
  products_count?: number;
  children: Category[];
};

export interface CategoryData extends Response<Category> {
  response: Category;
}

export interface CategoryListData extends ResponsePaginate {
  data: Category[];
}

export interface CategoryResponse extends Response<CategoryListData> {
  status: string;
  code: number;
  response: CategoryListData;
}
