import { combineReducers } from '@reduxjs/toolkit';
import marketGraphReducer from 'features/marketGraph/marketGraphSlice';
import serverReducer from 'features/server/serverSlice';

export const rootReducer = combineReducers({
  server: serverReducer,
  marketGraph: marketGraphReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
