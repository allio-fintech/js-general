import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { rootReducer, RootState } from './reducer';

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
  });

  if (process.env.NODE_ENV !== 'production' && module?.hot) {
    module.hot.accept('./reducer', () => store.replaceReducer(rootReducer));
  }

  return store;
};

export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

export const wrapper = createWrapper<RootState>(makeStore);
