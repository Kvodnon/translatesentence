import styled from 'styled-components';
import { useSpeechSynthesis } from 'react-speech-kit';
import { useSelector } from 'react-redux';
import { CheckProps, State } from '../../app/interfaces';

const Button = styled.button`
    width: 100%;
    height: 60px;
    cursor: pointer;
    border-radius: 15px;
    margin-top: 10px;
`;

const Check: CheckProps = ({selectWords, setSuccess}) => {
    const { speak, voices } = useSpeechSynthesis();
    const { sentence, answer } = useSelector((state: State) => state);
    const womanWoice = 2;
    const selectedRightWords = selectWords(sentence.rightAnswer).join();
    const selectedAnswer = selectWords(answer).join();
    
    const handleClick = () => {
        const isAnswer:boolean = selectedRightWords === selectedAnswer;

        setSuccess(isAnswer);
    
        return isAnswer && speak({ text: selectedRightWords, voice: voices[womanWoice] });
    }
    
    return (
        <Button onClick={handleClick}>Проверить ответ</Button>
    );
}

export default Check;