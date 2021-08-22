import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import styled from 'styled-components'

import { WordProps } from '../../app/interfaces';

const Span = styled.span`
    border: 1px solid #ccc;
    background: white;
    border-radius: 10px;
    cursor: grab;
    user-select: none;

    margin: 5px;
    padding: 5px 10px;
`;

const Word = ({word, index}: WordProps) => {
    const renderWord = (provided: DraggableProvided) => (
        <Span  ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            {word.text}
        </Span>
    );

    return (
        <Draggable draggableId={`word-${word.id}`} index={index}>
            {(provided) => renderWord(provided)}
        </Draggable>
    );
}

export default Word;