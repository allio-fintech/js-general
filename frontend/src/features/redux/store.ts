import { configureStore } from '@reduxjs/toolkit';
import { MakeStore, createWrapper } from 'next-redux-wrapper';
import { rootReducer, RootState } from './reducer';

export const makeStore: MakeStore<RootState> = () => {
  const store = configureStore({
    reducer: rootReducer,
  });

  if (process.env.NODE_ENV !== 'production' && module?.hot) {
    module.hot.accept('./reducer', () => store.replaceReducer(rootReducer));
  }

  return store;
};

export const wrapper = createWrapper<RootState>(makeStore, { debug: true });
