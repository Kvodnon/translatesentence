import { Draggable, DraggableProvided } from "react-beautiful-dnd";

import { WordProps } from '../../app/interfaces';

import classes from "./Word.module.css";

export const Word = ({word, index}: WordProps) => {
    const renderWord = (provided: DraggableProvided) => (
        <span className={`${classes.word} ${classes.app__word}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
        >
            {word.text}
        </span>
    );

    return (
        <Draggable draggableId={`word-${word.id}`} index={index}>
            {(provided) => renderWord(provided)}
        </Draggable>
    );
}