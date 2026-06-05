import React from 'react'
import styled from 'styled-components'
import quiz_correct from "@/assets/quiz_correct.svg"
import quiz_incorrect from "@/assets/quiz_incorrect.svg"
import ActionButton from './ActionButton'

const AnswerSection = styled.div`
    display: flex;
    width: 100%;
    max-width: 920px;
    margin-top: 40px;
`;

const AnswerInnerSection = styled.div`
    display: flex;
    align-items : center;
    justify-content: space-between;
    width: 100%;
    padding: 32px 40px;

    border-radius: 20px;
    background: #F0F5ED;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.10);
`;

const AnswerCircle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(43, 108, 0, 0.10);
    background: ${(props)=> (props.$isCorrect ? 'rgba(43, 108, 0, 0.10)' : '#FF0000')};
    
`;

const AnswerTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 24px;
    gap: 8px;
    h3 {
        margin: 0;
        color: #1B1C1C;
        font-size: 20px;
        font-weight: 700;
    };
    p {
        margin: 0;
        width: 100%;
        color: #3F4A36;
        font-family: "Nunito Sans", sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 1.5;
    };
`;//h3 & p tag 포함

function AnswerCard({isCorrect, explanation, isLastQuestion, handleNext}) {
    return (
        <AnswerSection>
            <AnswerInnerSection>
                <AnswerCircle $isCorrect={isCorrect}>
                    <img src={isCorrect ? quiz_correct : quiz_incorrect} alt={isCorrect ? "정답 아이콘" : "오답 아이콘"}/>
                </AnswerCircle>
                <AnswerTextWrapper>
                    <h3>{isCorrect ? "정답입니다!" : "오답입니다!"}</h3>
                    <p>{explanation}</p>
                </AnswerTextWrapper>
                <ActionButton
                    isActived={true}
                    onClick={handleNext}
                    text={isLastQuestion ? "수고하셨습니다"  : "다음 문제"}
                />
            </AnswerInnerSection>
        </AnswerSection>
    );
}

export default AnswerCard;