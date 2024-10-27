import { API } from '@/constant/api';

interface IQuery {
  page_size?: number | '';
  page_index?: number | '';
  search?: string | '';
  category_id?: string | '';
  price_from?: number | '';
  price_to?: number | '';
  sort?: string | '';
  in_stock?: boolean | '';
}

const handleFetchDataProducts = async ({
  page_size,
  page_index,
  search,
  category_id,
  price_from,
  price_to,
  sort,
  in_stock,
}: IQuery) => {
  try {
    const res = await fetch(
      API.client.products['product-list']({
        page_size,
        page_index,
        search: search ? search : '',
        category_id: category_id ? category_id : '',
        price_from: price_from ? price_from : '',
        price_to: price_to ? price_to : '',
        sort: sort ? sort : '',
        in_stock: !!in_stock ? in_stock : '',
      }),
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-cache',
      },
    );
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default handleFetchDataProducts;
