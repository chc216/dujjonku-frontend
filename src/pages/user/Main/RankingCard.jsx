import React, { useState } from "react";
import styled from "styled-components";

const Ranking = styled.div`
    background-color: #ffffff;
    border-radius: 20px;
    box-shadow: 5px 5px 10px #ebe6e6;
    padding: 30px;

    h3 {
        margin-top: 0;
        margin-bottom: 20px;
        color: #333;
    }
`;

/* 개수 10개, 30개씩 보여주는 상태 정의 */
const ExpandableWrapper = styled.div`
    /* 순위 확장 시 2000px 까지 늘어남 */
    max-height: ${(props) => (props.$isExpanded ? '2000px' : '350px')};
    overflow: hidden;   /* 10개 이상 나머지 순위 안보임 */
    transition: max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1);

    @media (max-width: 768px) {
        max-height: ${(props) => (props.$isExpanded ? '3000px' : '550px')};
    }
`;

const RankingItem = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr; /* 2열 배치 */
    gap: 20px 40px;

    /* 모바일 화면에서는 1열로 나타냄 */
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

/* 메달 색상 변화 */
const badgeStyle = (rank) => {
    switch (rank) {
        case 1: return { bg: '#DDAD00', text: '#574300', border: '1px solid #574300'};
        case 2: return { bg: '#E3E4E5', text: '#4A4A4A', border: '1px solid #574300'};
        case 3: return { bg: '#CD7F32', text: '#FFFFFF', border: '1px solid #574300'};
        default: return { bg: '#F2F2F2', text: '#3F4A36'};
    }
};

const RankingBadge = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 14px;
    margin-right: 15px;

    background-color: ${(props) => badgeStyle(props.rank).bg};
    color: ${(props) => badgeStyle(props.rank).text};
`;

const WordInfo = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;

    .keyword {
        font-size: 16px;
        font-weight: 700;
        color: #1B1C1C;    
    }

    .descript {
        font-size: 13px;
        color: #3F4A36;
        margin-top: 4px;
    }
`;

const ExpandButton = styled.button`
    width: 100%;
    height: 45px;
    margin-top: 15px;
    border-radius: 15px;
    background-color: #ffffff;
    border: 1px solid #88CEFF;
    color: #006590;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;

    &:hover {
        background-color: #e4e0e0;
    }
`;

function RankingCard({ wordsList }) {
    const [isExpanded, setIsExpanded] = useState(false);

    /*
    const displayCount = isExpanded ? 30 : 10;  // 랭킹에 나타낼 개수 정의
    const displayWords = wordsList.slice(0, displayCount);  // .slice(시작, 끝)으로 displayCount만큼 자름
    */

    return (
        <Ranking>
            <h3>인기 유행어 랭킹</h3>

            <ExpandableWrapper $isExpanded={isExpanded}>
                <RankingItem>
                    {wordsList.map((word, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                <RankingBadge rank={index+1}>{index+1}</RankingBadge>
                                <WordInfo>
                                    <span className="keyword">{word.keyword}</span>
                                    <span className="descript">{word.description}</span>
                                </WordInfo>
                            </div>
                            <div>{word.trend}</div>
                        </div>
                    ))}
                </RankingItem>
            </ExpandableWrapper>

            <ExpandButton onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? '접기' : '전체 순위 보기'}
            </ExpandButton>
        </Ranking>
    );
}

export default RankingCard;