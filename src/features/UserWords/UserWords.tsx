import { useSelector } from "react-redux";
import { Droppable, DroppableProvided } from "react-beautiful-dnd";

import { Word, State } from "../../app/interfaces";
import { Answer } from "../../Components/Answer/Answer";

import classes from './UserWords.module.css';


export const UserWords = () => {
    const userWords = useSelector((state: State) => state.userWords);

    const listOfWords = (words: Word[]) => (
        words.map((word, index) => (
            <Answer key={`word-${word.id}`} index={index} word={word}  />
        ))
    );

    const renderWords = (provided: DroppableProvided) => (
        <div className={classes['user-words']} {...provided.droppableProps} ref={provided.innerRef}>
            {listOfWords(userWords)}
            {provided.placeholder}
        </div>  
    );

    return (
        <Droppable droppableId="user-answer" direction="horizontal">
            {(provided) => renderWords(provided)}
        </Droppable>
    );
}