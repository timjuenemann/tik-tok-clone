import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import screenReducer from './screenSlice';

export const store = configureStore({
  reducer: {
    screen: screenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
