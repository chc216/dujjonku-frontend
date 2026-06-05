import React from "react";
import styled from "styled-components";

const QuestionSection = styled.div`
    width: 920px;
    margin-bottom: 40px;
    padding: 60px 0;


    border-radius: 20px;
    background: #FFFFFF;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
`;
const QuestionHeader = styled.div`
    display: flex;
    padding: 4px 12px;
    flex-direction: column;
    align-items: center;
    border-radius: 6px;
    border: 1px solid rgba(43, 108, 0, 0.20);
    background: rgba(43, 108, 0, 0.10);
    color: #2B6C00;
    text-align: center;
    font-family: Lexend;
    font-size: 14px;
    font-style: normal;
    font-weight: 150px;
    line-height: 20px;
`;

const QuestionTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    max-width: 700px;
    padding: 0 20px;

    color: #1B1C1C;
    text-align: center;

    font-family: "Plus Jakarta Sans", sans-serif;;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.5;
    letter-spacing: -1px;
`;

function QuestionCard({question}) {
    return (
        <QuestionSection>
            <QuestionHeader>이 단어의 뜻은?</QuestionHeader>
            <QuestionTextWrapper>
                <h1>{question}</h1>
            </QuestionTextWrapper>
        </QuestionSection>
    );
}

export default QuestionCard;