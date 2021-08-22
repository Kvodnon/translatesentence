import styled, { css } from 'styled-components';
import { MessageProps } from '../../app/interfaces';

const Container = styled.div`
    text-align: center;
    display: none;
    
    margin: 20px 0;
    
    color: green;

    ${({ isSuccess }) => !isSuccess && css`
        display: block;
        color: red;
    `}
`;

const Message: MessageProps = ({isSuccess}) => {
    const message: boolean | string = !isSuccess && 'Составьте предложение правильно';

    return (
        <Container isSuccess={isSuccess}>{message}</Container>
    );
}

export default Message;