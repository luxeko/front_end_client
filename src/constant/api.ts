const serverUrl = process.env.SERVER_URL;

export const API = {
  auth: {
    register: serverUrl + '/auth/register',
    refreshToken: serverUrl + '/auth/refresh-token',
    verifyOTP: serverUrl + '/auth/verify-otp',
    login: serverUrl + '/auth/login',
    resendOtp: serverUrl + '/auth/resend-otp',
    profile: serverUrl + '/auth/profile',
    logout: serverUrl + '/auth/logout',
    changePassword: serverUrl + '/auth/change-password',
    getUserEmailAndPhoneNumber:
      serverUrl + '/auth/get-user-email-and-phone-number',
  },
  client: {
    categories: {
      'list-category': serverUrl + '/client/list-category',
      'get-category-by-children-id': (children_id: string) =>
        serverUrl + `/client/get-category-by-children-id/${children_id}`,
    },
    products: {
      'product-list': ({
        page_size = '',
        page_index = '',
        search = '',
        category_id = '',
        price_from = '',
        price_to = '',
        sort = '',
        in_stock = '',
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
        serverUrl +
        `/client/products?page_size=${page_size}&page_index=${page_index}&search=${search}&category_id=${category_id}&price_from=${price_from}&price_to=${price_to}&sort=${sort}&in_stock=${in_stock}`,
      'new-products': ({ page_size = '' }: { page_size?: number | '' }) =>
        serverUrl +
        `/client/products?page_size=${page_size}&page_index=1&sort=created_at-desc`,
      'best-selling-products': ({
        page_size = '',
      }: {
        page_size?: number | '';
      }) =>
        serverUrl +
        `/client/products?page_size=${page_size}&page_index=1&sort=price`,
      'out-standing-products': ({
        page_size = '',
      }: {
        page_size?: number | '';
      }) =>
        serverUrl +
        `/client/products?page_size=${page_size}&page_index=1&sort=outstanding`,
      'product-details': (id: string) => serverUrl + `/client/products/${id}`,
      'price-min-max': serverUrl + '/client/products/price/min-max',
    },
    orders: {
      create: serverUrl + '/client/orders',
    },
    payments: {
      create: serverUrl + '/client/payment',
    },
  },
};
