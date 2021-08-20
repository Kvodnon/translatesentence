import { useDispatch, useSelector } from 'react-redux';
import {DragDropContext, DraggableLocation, DragStart, DropResult} from 'react-beautiful-dnd';
import classes from './App.module.css';
import { UserWords } from '../features/UserWords/UserWords';
import { SuggestedWords } from '../features/SuggestedWords/SuggestedWords';
import { selectSuggested, setSuggestedList } from '../features/SuggestedWords/suggestedWordsSlice';
import { selectUserWords, setUserAnswerList } from '../features/UserWords/userWordsSlice';
import { useState } from 'react';

interface Word {
  id: number,
  text: string,
}

interface KeyAsName {
  [key: string]: Word[]
}


function App() {
  const dispatch = useDispatch();
  const userAnswer = useSelector(selectUserWords);
  const suggested = useSelector(selectSuggested);
  const [isSuggestedDropDisabled, setIsSuggestedDropDisabled] = useState(true);
  
  const id2List: KeyAsName = {
      'user-answer': userAnswer,
      'suggested-list': suggested
  };

  // a little function to help us with reordering the result
  const reorder = (list: Word[], startIndex: number, endIndex: number) => {
      const result = [...list];
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
  
      return result;
  };

  
  const sortSuggestedWords = (suggestedWords: Word[]) => {
    return [...suggestedWords].sort((prev: Word, next: Word) => prev.id - next.id);
  }
  /**
   * Moves an item from one list to another list.
   */
  const move = (source: Word[], destination: Word[], droppableSource: DraggableLocation, droppableDestination: DraggableLocation) => {
      const sourceClone = Array.from(source);
      const destClone = Array.from(destination);
      const [removed] = sourceClone.splice(droppableSource.index, 1);
  
      destClone.splice(droppableDestination.index, 0, removed);
  
      const result:KeyAsName = {};
      result[droppableSource.droppableId] = sourceClone;
      result[droppableDestination.droppableId] = destClone;
  
      return result;
  };
  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */

  const getList = (id: string): Word[] => id2List[id];


  const onDragStart = (result: DragStart) => {
      const { source } = result;

      if (source.droppableId === 'user-answer') {
        setIsSuggestedDropDisabled(false);
      }
  };

  const onDragEnd = (result: DropResult) => {
      const { source, destination } = result;

      // dropped outside the list
      if (!destination) {
          return;
      }

      if (source.droppableId === destination.droppableId) {
          const items = reorder(
              getList(source.droppableId),
              source.index,
              destination.index
          );

          if (source.droppableId === 'user-answer') {
            dispatch(setUserAnswerList(items));
          } else {
            dispatch(setSuggestedList(items));
          }
      } else {
          const result: KeyAsName = move(
              getList(source.droppableId),
              getList(destination.droppableId),
              source,
              destination
          );

          dispatch(setUserAnswerList(result['user-answer']));
          dispatch(setSuggestedList(result['suggested-list']));
          
          if (destination.droppableId === 'suggested-list') {
            dispatch(setSuggestedList(sortSuggestedWords(result['suggested-list'])));
          }
      }
      
      setIsSuggestedDropDisabled(true);
  };

  return (
    <div className="App">
      <div className={classes.container}>
        <h1 className={classes.heading}>Переведите это предложение</h1>

        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
          <UserWords key={"user-answer"} />
          <SuggestedWords key={"suggested-list"} isDropDisabled={isSuggestedDropDisabled}/> 
        </DragDropContext>
        
      </div>
    </div>
  );
}

export default App;
