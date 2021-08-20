import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State } from "../../app/store";

interface Word {
    id: number,
    text: string,
}

export const UserWordsSlice = createSlice({
    name: 'userWords',
    initialState: [] as Word[],
    reducers: {
        setUserAnswerList: (_, action: PayloadAction<Word[]>): Word[] => {
            return action.payload;
        }
    }
});

export const selectUserWords = (state: State) => state.userWords;

export const {
    setUserAnswerList
} = UserWordsSlice.actions;

export default UserWordsSlice.reducer;