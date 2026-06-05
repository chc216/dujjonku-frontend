import React from 'react'
import styled from 'styled-components';
import quiz_progress from '@/assets/quiz_progress.svg';

const ProgressSection = styled.div`
    width: 920px;
    margin-bottom: 40px;

    display: flex;
    flex-direction: column;
    justify-content: center
`;
const ProgressTextWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
`;

const BarContainer = styled.div`
    display: flex;
    height: 8px;
    width: 50%;
    margin-top: 16px;
    border-radius: 9999px;
    background: #E4E2E2;
`;

const ProgressFillBar = styled.div`
    width: ${(props) => (props.$percent)}%;
    height: 8px;
    border-radius: 9999px;
    background: #2B6C00;

    transition: width 0.3s ease-in-out;
`;

function ProgressBar({currentIndex, totalQuestionNum, progressPercent}) {
    return (
        <ProgressSection>
            <ProgressTextWrapper>
                <span>{currentIndex+1}번째 문제 / 총 {totalQuestionNum}</span>
                <span>
                    <img src={quiz_progress} alt="진행률 아이콘"/>
                     진행률 {progressPercent}%
                </span>
            </ProgressTextWrapper>
            <BarContainer>
                <ProgressFillBar $percent={progressPercent}/>
            </BarContainer>
        </ProgressSection>
    );
}

export default ProgressBar;