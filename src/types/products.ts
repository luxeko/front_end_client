import { Response, ResponsePaginate } from '@/types/response';
import { Category } from '@/types/categories';

export type Product = {
  id: string;
  product_code: string;
  product_name: string;
  price: number;
  stock: number;
  sold: number;
  image_path: string;
  image_name: string;
  summary?: string;
  content?: string;
  status?: boolean;
  creator_id?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  comments?: any[];
  thumbnails: {
    image_path: string;
    image_name: string;
  }[];
  categories?: Category[];
  comment_count: number | 0;
};

export type ProductPriceMinMax = {
  max: number;
  min: number;
};

export interface ProductData extends Response<Product> {
  response: Product;
}
export interface ProductPriceData extends Response<ProductPriceMinMax> {
  response: ProductPriceMinMax;
}
export interface ProductListData extends ResponsePaginate {
  data: Product[];
}

export interface ProductListResponse extends Response<ProductListData> {
  status: string;
  code: number;
  response: ProductListData;
}
