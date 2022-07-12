import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import mailboxReducer from "../reducers/mailbox/mailboxSlice";

export const store = configureStore({
  reducer: {
    mailbox: mailboxReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
