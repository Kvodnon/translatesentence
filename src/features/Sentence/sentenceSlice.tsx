import { createSlice } from "@reduxjs/toolkit";

import { State } from "../../app/interfaces";

export const SentenceSlice = createSlice({
    name: 'sentence',
    initialState: {
        sentence: [
            {
                id: 1,
                text: 'Я'
            },
            {
                id: 2,
                text: 'люблю'
            },
            {
                id: 3,
                text: 'хоккей'
            },
            {
                id: 4,
                text: 'но'
            },
            {
                id: 5,
                text: 'у'
            },
            {
                id: 6,
                text: 'меня'
            },
            {
                id: 7,
                text: 'нет'
            },
            {
                id: 8,
                text: 'любимой'
            },
            {
                id: 9,
                text: 'команды'
            }
        ],
        rightAnswer: [
            {
                id: 1,
                text: 'I'
            },
            {
                id: 2,
                text: 'like'
            },
            {
                id: 3,
                text: 'hockey'
            },
            {
                id: 4,
                text: 'but'
            },
            {
                id: 5,
                text: 'I'
            },
            {
                id: 6,
                text: "don't"
            },
            {
                id: 7,
                text: 'have'
            },
            {
                id: 8,
                text: 'a'
            },
            {
                id: 9,
                text: 'favorite'
            },
            {
                id: 10,
                text: 'team'
            }
        ],
        startSuggestedOrder: [
            {
                id: 2,
                text: 'like'
            },
            {
                id: 7,
                text: "don't"
            },
            {
                id: 4,
                text: 'but'
            },
            {
                id: 3,
                text: 'hockey'
            },
            {
                id: 8,
                text: 'favorite'
            },
            {
                id: 10,
                text: 'I'
            },
            {
                id: 1,
                text: 'I'
            },
            {
                id: 6,
                text: 'have'
            },
            {
                id: 9,
                text: 'team'
            },
            {
                id: 5,
                text: 'a'
            }
        ]
    },
    reducers: {}
});

export const selectSentence = (state: State) => state.sentence;

export default SentenceSlice.reducer;