export const PATH = {
  home: '/',
  login: '/login',
  register: '/register',
  product: {
    list: ({
      page_size,
      page_index,
      search,
      category_id,
      price_from,
      price_to,
      sort,
      in_stock,
    }: {
      page_size?: number | '';
      page_index?: number | '';
      search?: string | '';
      category_id?: string | '';
      price_from?: number | '';
      price_to?: number | '';
      sort?: string | '';
      in_stock?: boolean | '';
    }) =>
      `/products?page_size=${page_size}&page_index=${page_index}&search=${search}&category_id=${category_id}&price_from=${price_from}&price_to=${price_to}&sort=${sort}&in_stock=${in_stock}`,
    details: (id: string) => '/products' + '/' + id,
  },
  user: {
    profile: '/user/profile',
    histories: '/user/histories',
    settings: '/user/settings',
    notifications: '/user/notifications',
  },
  cart: '/cart',
  checkout: '/checkout',
};
