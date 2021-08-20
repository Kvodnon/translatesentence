import classes from './Answer.module.css';
import {Draggable} from 'react-beautiful-dnd';

interface Props {
    word: {
        id: number,
        text: string
    },
    index: number
}

export const Answer = ({word, index}: Props) => {
    return (
        <Draggable draggableId={`word-${word.id}`} index={index}>
            {provided => (
                <span className={`${classes.answer} ${classes.app__answer}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {word.text}
                </span>
            )}
      </Draggable>
    );
}