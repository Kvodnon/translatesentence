import { useSelector } from "react-redux";
import { Answer } from "../../Components/Answer/Answer";
import { selectSuggested } from "./suggestedWordsSlice";
import {Droppable} from 'react-beautiful-dnd';
import classes from './SuggestedWords.module.css';

export const SuggestedWords = ({isDropDisabled}: {isDropDisabled:boolean}) => {
    const suggestedList = useSelector(selectSuggested);

    return (
        <Droppable droppableId="suggested-list" direction="horizontal" isDropDisabled={isDropDisabled}>
            {(provided) => (
                <div className={classes["suggested-words"]} {...provided.droppableProps} ref={provided.innerRef}>
                    {suggestedList.map((word, index) => (
                        <Answer key={`word-${word.id}`} index={index} word={word} />
                    ))}
                    {provided.placeholder}
                </div>  
            )}
        </Droppable>
    );
}