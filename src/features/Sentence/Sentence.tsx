import { useSelector } from 'react-redux';

import { selectSentence } from './sentenceSlice';

import classes from './Sentence.module.css';

export const Sentence = () => {
    const { sentence } = useSelector(selectSentence);

    const renderSentence = () => {
        return sentence.map((word) => <span key={`sentence-word-${word.id}`} className={`${classes['sentence-word']}`}>{word.text}</span>);
    }

    return (
        <div className={`${classes.sentence} ${classes['app__sentence']}`}>
            <img src="/img/woman.svg" className={classes.woman} alt="woman" />

            <div className={classes.bubble}>{renderSentence()}</div>
        </div>
    );
}