import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; // ruta correcta a tu authSlice
import yearsWithReducer from '../features/yearsWith/yearsWithSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  years_with: yearsWithReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
