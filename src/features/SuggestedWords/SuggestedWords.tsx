import { useSelector } from "react-redux";
import {Droppable, DroppableProvided} from "react-beautiful-dnd";

import { ISuggestedWords, State, Word } from "../../app/interfaces";
import { Answer } from "../../Components/Answer/Answer";

import classes from './SuggestedWords.module.css';

export const SuggestedWords = ({isDropDisabled}: ISuggestedWords) => {
    const suggestedList = useSelector((state: State) => state.suggestedWords);

    const listOfWords = (words: Word[]) => (
        words.map((word, index) => (
            <Answer key={`word-${word.id}`} index={index} word={word}  />
        ))
    );

    const renderWords = (provided: DroppableProvided) => (
        <div className={classes["suggested-words"]} {...provided.droppableProps} ref={provided.innerRef}>
            {listOfWords(suggestedList)}
            {provided.placeholder}
        </div>  
    );

    return (
        <Droppable droppableId="suggested-list" direction="horizontal" isDropDisabled={isDropDisabled}>
            {(provided) => renderWords(provided)}
        </Droppable>
    );
}