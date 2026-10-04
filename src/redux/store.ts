import { configureStore } from '@reduxjs/toolkit';
import baseApi from './baseApi';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these for file uploads/downloads and form data
        ignoredActions: ['baseApi/executeMutation/fulfilled', 'baseApi/executeMutation/pending'],
        ignoredPaths: ['baseApi.mutations'],
      },
    }).concat(baseApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;