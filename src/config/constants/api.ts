import { Schemas } from '../../types/helpers/schemas';

export const HEADERS = {
  header: () => ({
    accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
  }),
  fileHeader: () => ({
    'Content-Type': 'multipart/form-data',
  }),
  authHeader: () => ({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `${localStorage.getItem('token')}`,
  }),
};

export const API_URLS = {
  AUTH: {
    signup: () => ({
      endPoint: `${Schemas.StaffsSchema}/signup`,
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),
    LOGIN: () => ({
      endPoint: `${Schemas.StaffsSchema}/login`,
      method: 'POST',
      headers: HEADERS.header(),
    }),
  },
  TABLES: {
    createTable: () => ({
      endPoint: `${Schemas.TablesSchema}`,
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),
    getAllTables: () => ({
      endPoint: `${Schemas.TablesSchema}`,
      method: 'GET',
      headers: HEADERS.authHeader(),
    }),
    editTable: (id: number) => ({
      endPoint: `${Schemas.TablesSchema}/${id}`,
      method: 'PUT',
      headers: HEADERS.authHeader(),
    }),
    getTableById: (id: number) => ({
      endPoint: `${Schemas.TablesSchema}/${id}`,
      method: 'GET',
      headers: HEADERS.authHeader(),
    }),
    blockTable: (id: number) => ({
      endPoint: `${Schemas.TablesSchema}/${id}/block`,
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),
    unblockTable: (id: number) => ({
      endPoint: `${Schemas.TablesSchema}/${id}/un-block`,
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),
  },
  FOOD: {
    addFood: () => ({
      endPoint: `${Schemas.FoodsSchema}`,
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),
    getAllFood: () => ({
      endPoint: `${Schemas.FoodsSchema}`,
      method: 'GET',
      headers: HEADERS.authHeader(),
    }),
    editFood: (id: number) => ({
      endPoint: `${Schemas.FoodsSchema}/${id}`,
      method: 'PUT',
      headers: HEADERS.authHeader(),
    }),
    getFoodById: (id: number) => ({
      endPoint: `${Schemas.FoodsSchema}/${id}`,
      method: 'GET',
      headers: HEADERS.authHeader(),
    }),
    deleteFood: (id: number) => ({
      endPoint: `${Schemas.FoodsSchema}/${id}`,
      method: 'DELETE',
      headers: HEADERS.authHeader(),
    }),
    activeFood: (id: number) => ({
      endPoint: `${Schemas.FoodsSchema}/${id}/active`,
      method: 'PUT',
      headers: HEADERS.authHeader(),
    }),
    inActiveFood: (id: number) => ({
      endPoint: `${Schemas.FoodsSchema}/${id}/inactive`,
      method: 'PUT',
      headers: HEADERS.authHeader(),
    }),
  },
  CUSTOMER: {
    addCustomer: () => ({
      endPoint: `${Schemas.CustomersSchema}`,
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),
    getAllCustomers: () => ({
      endPoint: `${Schemas.CustomersSchema}`,
      method: 'GET',
      headers: HEADERS.authHeader(),
    }),
    editCustomer: (id: number) => ({
      endPoint: `${Schemas.CustomersSchema}/${id}`,
      method: 'PUT',
      headers: HEADERS.authHeader(),
    }),
    deleteCustomer: (id: number) => ({
      endPoint: `${Schemas.CustomersSchema}/${id}`,
      method: 'DELETE',
      headers: HEADERS.authHeader(),
    }),
  },
  STAFF: {
    editStaff: (username: string) => ({
      endPoint: `${Schemas.StaffsSchema}/${username}/profile`,
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),
    getAllStaffs: () => ({
      endPoint: `${Schemas.StaffsSchema}`,
      method: 'GET',
      headers: HEADERS.authHeader(),
    }),
    deleteStaff: (id: number) => ({
      endPoint: `${Schemas.StaffsSchema}/${id}`,
      method: 'DELETE',
      headers: HEADERS.authHeader(),
    }),
  },
  ORDER: {
    addOrder: () => ({
      endPoint: `${Schemas.OrdersSchema}`,
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),
    getAllOrders: () => ({
      endPoint: `${Schemas.OrdersSchema}`,
      method: 'GET',
      headers: HEADERS.authHeader(),
    }),
    cancelOrder: (id: number) => ({
      endPoint: `${Schemas.OrdersSchema}/${id}/cancel`,
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),
    orderFood: (id: number) => ({
      endPoint: `${Schemas.OrdersSchema}/${id}/order-food`,
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),
    makePayment: (payload: { id: number; voucher: number | undefined }) => ({
      endPoint: !payload.voucher
        ? `${Schemas.OrdersSchema}/${payload.id}/payment`
        : `${Schemas.OrdersSchema}/${payload.id}/payment?voucher=${payload.voucher}`,
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),
    detailFood: (id: number) => ({
      endPoint: `${Schemas.OrdersSchema}/${id}/detail-food`,
      method: 'GET',
      headers: HEADERS.authHeader(),
    }),
    voucher: (id: number) => ({
      endPoint: `Vouchers/${id}`,
      method: 'GET',
      headers: HEADERS.authHeader(),
    }),
    getStatistics: () => ({
      endPoint: `Statistics`,
      method: 'GET',
      headers: HEADERS.authHeader(),
    }),
  },

  PROFILE: {
    getProfileByUsername: (username: string) => ({
      endPoint: `${Schemas.StaffsSchema}/${username}/profile`,
      method: 'GET',
      headers: HEADERS.authHeader(),
    }),
    updateProfile: (username: string) => ({
      endPoint: `${Schemas.StaffsSchema}/${username}/profile`,
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),
  },
};
