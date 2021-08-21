import {Droppable, DroppableProvided} from "react-beautiful-dnd";

import { WordsProps } from "../../app/interfaces";
import { Word } from "../Word/Word";

import classes from './Words.module.css';

export const Words = ({words, containerClass, isDropDisabled = false}: WordsProps) => {
    const renderWords = () => (
        words.map((word, index) => (
            <Word key={`word-${word.id}`} index={index} word={word}  />
        ))
    );

    const renderContainer = (provided: DroppableProvided) => (
        <div className={`${classes["words"]} ${classes[containerClass]} ${classes['app__words']}`} {...provided.droppableProps} ref={provided.innerRef}>
            {renderWords()}
            {provided.placeholder}
        </div>  
    );

    return (
        <Droppable droppableId={containerClass} direction="horizontal" isDropDisabled={isDropDisabled}>
            {(provided) => renderContainer(provided)}
        </Droppable>
    );
}