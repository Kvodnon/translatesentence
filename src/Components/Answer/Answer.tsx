import {Draggable, DraggableProvided} from "react-beautiful-dnd";

import classes from "./Answer.module.css";

interface Props {
    word: {
        id: number,
        text: string
    },
    index: number
}

export const Answer = ({word, index}: Props) => {
    const renderWord = (provided: DraggableProvided) => (
        <span className={`${classes.answer} ${classes.app__answer}`}
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