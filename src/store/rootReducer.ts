import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/reducer';
import customerReducer from './customers/reducer';
import uiReducer from './ui/reducer';
import paymentsReducer from './payments/reducer';

const rootReducer = combineReducers({
  payments: paymentsReducer,
  user: userReducer,
  customers: customerReducer,
  ui: uiReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
