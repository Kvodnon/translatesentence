import {Droppable, DroppableProvided} from "react-beautiful-dnd";
import styled, { css } from 'styled-components'

import { WordsProps } from "../../app/interfaces";
import Word from "../Word/Word";

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    
    margin: 40px 0;

    ${({ containerClass }) => containerClass === 'answer' && css`
        min-height: 20px;
        border-top: 1px solid;
        border-bottom: 1px solid;
        padding: 5px 0;
    `}
    
    ${({ containerClass }) => containerClass === 'suggested' && css`
        padding: 10px 0 30px;
        margin: 0
    `}
`;

const Words = ({words, containerClass, isDropDisabled = false}: WordsProps) => {
    const renderWords = () => (
        words.map((word, index) => (
            <Word key={`word-${word.id}`} index={index} word={word}  />
        ))
    );

    const renderContainer = (provided: DroppableProvided) => (
        <List containerClass={containerClass} {...provided.droppableProps} ref={provided.innerRef}>
            {renderWords()}
            {provided.placeholder}
        </List>  
    );

    return (
        <Droppable droppableId={containerClass} direction="horizontal" isDropDisabled={isDropDisabled}>
            {renderContainer}
        </Droppable>
    );
}

export default Words;