import { configureStore } from "@reduxjs/toolkit";
import answerReducer from "../features/Answer/answerSlice";
import sentenceReducer from "../features/Sentence/sentenceSlice";
import suggestedReducer from "../features/Suggested/suggestedSlice";

export const store = configureStore({
  reducer: {
    sentence: sentenceReducer,
    answer: answerReducer,
    suggested: suggestedReducer
  }
});