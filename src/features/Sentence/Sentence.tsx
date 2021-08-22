import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { State, Word } from '../../app/interfaces';

const Container = styled.div`
    display: flex;
    
    margin: 20px 0;
`;

const Img = styled.img`
    max-width: 200px;
`;

const Bubble = styled.div`
    position: relative;
    align-self: flex-start;
    padding: 15px 10px;
    width: 100%;
    border-radius: 10px;
    border: 2px solid;    
    word-break: break-all;

    &:after {
        content: '';
        position: absolute;
        display: block;
        width: 0;
        z-index: 1;
        border-style: solid;
        border-width: 0 0 20px 20px;
        border-color: transparent transparent #eee transparent;
        top: 80%;
        left: -19px;
        margin-top: -16px;
    }
    &:before {
        content: '';
        position: absolute;
        display: block;
        width: 0;
        z-index: 1;
        border-style: solid;
        border-width: 0 0 22px 22px;
        border-color: transparent transparent black transparent;
        top: 80%;
        left: -23px;
        margin-top: -16px;
    }
`;

const SentenceWord = styled.div`
    display: inline-block;
    border-bottom: 1px dashed;
    margin: 5px;
`;

export const Sentence = () => {
    const { sentence } = useSelector((state: State) => state.sentence);

    const renderSentence = () => sentence.map((word: Word) => <SentenceWord key={`sentence-word-${word.id}`}>{word.text}</SentenceWord>);

    return (
        <Container>
            <Img src="/img/woman.svg" alt="woman" />
            <Bubble>{renderSentence()}</Bubble>
        </Container>
    );
}