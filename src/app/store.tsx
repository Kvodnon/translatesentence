import { configureStore } from "@reduxjs/toolkit";
import suggestedWordsReducer from "../features/SuggestedWords/suggestedWordsSlice";
import userWordsReducer from "../features/UserWords/userWordsSlice";

export const store = configureStore({
  reducer: {
    suggestedWords: suggestedWordsReducer,
    userWords: userWordsReducer
  }
});

export type State = ReturnType<typeof store.getState>