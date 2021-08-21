import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {DragDropContext, DraggableLocation, DragStart, DropResult, PreDragActions, SensorAPI, SnapDragActions} from 'react-beautiful-dnd';

import { Word, State, KeyAsName } from "../app/interfaces";
import { Sentence } from '../features/Sentence/Sentence';
import { Words } from '../Components/Words/Words';
import { setAnswerWords } from '../features/Answer/answerSlice';
import { setSuggestedWords } from '../features/Suggested/suggestedSlice';

import classes from "./App.module.css";

const {useSpeechSynthesis} = require('react-speech-kit');

function App() {
  const dispatch = useDispatch();
  const { answer, suggested, sentence } = useSelector((state: State) => state);
  const [ isSuggestedDropDisabled, setIsSuggestedDropDisabled ] = useState<boolean>(true);
  const [ isSuccess, setSuccess ] = useState<boolean>(true);
  const messageType = isSuccess ? 'message--success' : 'message--error';
  const message = !isSuccess && 'Составьте предложение правильно';
  const { speak, voices } = useSpeechSynthesis();
  const sensorAPIRef = useRef<SensorAPI | null>(null);
    
  const id2List: KeyAsName = {
      'answer': {
        list: answer,
        setList: setAnswerWords
      },
      'suggested': {
        list: suggested,
        setList: setSuggestedWords
      }
  };
  
  const delay = (fn: Function, time: number = 100)  => {
    return new Promise((resolve) => {
      setTimeout(() => {
        fn();
        resolve(0);
      }, time);
    });
  }

  const findSuggestedWord = (draggableId: string, suggested: Word[]) => {
    const needed = Number(draggableId.split('-')[1]);

    return suggested.find((word) => word.id === needed)?.text;
  }

  const selectWords = (list: Word[]) => list.map((word) => word.text)

   const lift = async(draggableId: string, needed: string = '', result: any) => {
    const rightWords = selectWords(sentence.startSuggestedOrder);
    const suggestedWords = selectWords(result);
    const api: SensorAPI | null = sensorAPIRef.current;

    if (!api) {
      console.warn('unable to find sensor api');
      return null;
    }

    const preDrag: PreDragActions | null = api.tryGetLock(draggableId);

    if (!preDrag) {
      console.log('unable to start capturing');
      return null;
    }

    let count;
    
    const actions: SnapDragActions = preDrag.snapLift();
    const { moveLeft, moveRight, drop } = actions;

    if (rightWords.indexOf(needed) > suggestedWords.indexOf(needed)) {
      count = rightWords.indexOf(needed) - suggestedWords.indexOf(needed);

      for (let i = 0; i < count; i++) {
        await delay(moveRight);
      }
    }
    
    if (rightWords.indexOf(needed) < suggestedWords.indexOf(needed)) {
      count = suggestedWords.indexOf(needed) - rightWords.indexOf(needed);

      for (let i = 0; i < count; i++) {
        await delay(moveLeft);
      }
    }

    await delay(drop);
      
    setIsSuggestedDropDisabled(true);
  }

  // a little function to help us with reordering the result
  const reorder = (list: Word[], startIndex: number, endIndex: number) => {
      const result = [...list];
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
  
      return result;
  };

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  const getList = (id: string): Word[] => id2List[id].list;
  
  /**
   * Moves an item from one list to another list.
   */
  const move = (source: Word[], destination: Word[], droppableSource: DraggableLocation, droppableDestination: DraggableLocation) => {
      const sourceClone = Array.from(source);
      const destClone = Array.from(destination);
      const [removed] = sourceClone.splice(droppableSource.index, 1);
  
      destClone.splice(droppableDestination.index, 0, removed);
  
      const result = {
        [droppableSource.droppableId]: sourceClone,
        [droppableDestination.droppableId]: destClone
      };
  
      return result;
  };

  const onDragStart = (result: DragStart) => result.source.droppableId === 'answer' && setIsSuggestedDropDisabled(false);

  const onDragEnd = async(result: DropResult) => {
      const { source, destination, draggableId } = result;

      if (!destination) {
          return;
      }

      if (source.droppableId === destination.droppableId) {
          const handler = id2List[source.droppableId];

          const items = reorder(
              getList(source.droppableId),
              source.index,
              destination.index
          );
          
          dispatch(handler.setList(items));
      } else {
          const result = move(
              getList(source.droppableId),
              getList(destination.droppableId),
              source,
              destination
          );

          dispatch(setAnswerWords(result['answer']));
          dispatch(setSuggestedWords(result['suggested']));
          
          if (destination.droppableId === 'suggested') {
            await dispatch(setSuggestedWords(result['suggested']));
            const needed = findSuggestedWord(draggableId, result['suggested']);

            lift(draggableId, needed, result['suggested']);
          }
      }
  };

  const checkAnswer = ():boolean => {
    return JSON.stringify(sentence.rightAnswer) === JSON.stringify(answer);
  }

  const handleClick = () => {
    setSuccess(checkAnswer());
    
    if (checkAnswer()) {
      speak({ text: 'She is eating', voice: voices[2] });
    }
  }

  return (
    <div className={classes.App}>
      <div className={classes.container}>
        <h1 className={classes.heading}>Переведите это предложение</h1>

        <Sentence />

        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart} sensors={[
          (api) => {
            sensorAPIRef.current = api;
          },
        ]}>
          <Words key="answer" words={answer} containerClass="answer" />
          <Words key="suggested" words={suggested} containerClass="suggested" isDropDisabled={isSuggestedDropDisabled} />
        </DragDropContext>


        <div className={`${classes.message} ${classes['app__message']} ${classes[messageType]}`}>{message}</div>

        <button onClick={handleClick} className={`${classes.check} ${classes['check__button']}`}>Проверить</button>
        
      </div>
    </div>
  );
}

export default App;
