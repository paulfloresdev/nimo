import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; // ruta correcta a tu authSlice
import yearsWithReducer from '../features/yearsWith/yearsWithSlice';
import monthsWithReucer from '../features/monthsWith/monthsWithSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  years_with: yearsWithReducer,
  months_with: monthsWithReucer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
