import { Reducer, combineReducers } from 'redux';
import authReducer from '../reducers/auth/auth.reducer';
import tableReducer from '../reducers/table/table.reducer';
import foodReducer from '../reducers/food/food.reducers';
import orderReducer from '../reducers/order/order.reducers';
import customerReducer from '../reducers/customer/customer.reducers';
import staffReducer from '../reducers/staff/staff.reducers';
import profileReducer from '../reducers/profile/profile.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  table: tableReducer,
  food: foodReducer,
  order: orderReducer,
  staff: staffReducer,
  customer: customerReducer,
  profile: profileReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const reducer: Reducer<RootState, any> = (state: RootState | undefined, action: any) => rootReducer(state, action);

export default reducer;
