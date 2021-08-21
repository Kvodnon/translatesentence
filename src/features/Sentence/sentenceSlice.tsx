import { createSlice } from "@reduxjs/toolkit";

import { State } from "../../app/interfaces";

export const SentenceSlice = createSlice({
    name: 'sentence',
    initialState: {
        sentence: [
            {
                id: 1,
                text: 'Она'
            },
            {
                id: 2,
                text: 'ест'
            }
        ],
        rightAnswer: [
            {
                id: 1,
                text: 'She'
            },
            {
                id: 2,
                text: 'is'
            },
            {
                id: 3,
                text: 'eating'
            }
        ],
        startSuggestedOrder: [
            {
                id: 1,
                text: 'She'
            },
            {
                id: 3,
                text: 'eating'
            },
            {
                id: 2,
                text: 'is'
            }
        ]
    },
    reducers: {}
});

export const selectSentence = (state: State) => state.sentence;

export default SentenceSlice.reducer;