import { useSelector } from "react-redux";
import { Answer } from "../../Components/Answer/Answer";
import { selectUserWords } from "./userWordsSlice";
import classes from './UserWords.module.css';
import {Droppable} from 'react-beautiful-dnd';

export const UserWords = () => {
    const userWords = useSelector(selectUserWords);

    return (
        <Droppable droppableId="user-answer" direction="horizontal">
            {(provided) => (
                <div className={classes['user-words']} {...provided.droppableProps} ref={provided.innerRef}>
                    {userWords.map((word, index) => (
                        <Answer key={`word-${word.id}`} index={index} word={word}  />
                    ))}
                    {provided.placeholder}
                </div>  
            )}
        </Droppable>
    );
}