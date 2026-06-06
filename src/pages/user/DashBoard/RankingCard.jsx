import React, { useState } from "react";
import styled from "styled-components";
import { FiTrendingUp, FiTrendingDown, FiMinus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

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
  max-height: ${(props) => (props.$isExpanded ? "2000px" : "420px")};
  overflow: hidden; /* 10개 이상 나머지 순위 안보임 */
  transition: max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 768px) {
    max-height: ${(props) => (props.$isExpanded ? "3000px" : "550px")};
  }
`;

const RankingItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; /* 2열 배치 */
  gap: 33px 40px;

  /* 모바일 화면에서는 1열로 나타냄 */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

/* 단어 클릭 컴포넌트 */
const ClickWord = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  /* &:hover { */
  /* background-color: #f4f6f8; */
  /* } */
`;

/* 메달 색상 변화 */
const getBadgeStyle = (rank) => {
  switch (rank) {
    case 1:
      return { bg: "#DDAD00", text: "#574300", border: "1px solid #574300" };
    case 2:
      return { bg: "#E3E4E5", text: "#4A4A4A", border: "1px solid #574300" };
    case 3:
      return { bg: "#CD7F32", text: "#FFFFFF", border: "1px solid #574300" };
    default:
      return { bg: "#F2F2F2", text: "#3F4A36" };
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

  background-color: ${(props) => getBadgeStyle(props.rank).bg};
  color: ${(props) => getBadgeStyle(props.rank).text};
`;

const WordInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  .keyword {
    font-size: 16px;
    font-weight: 700;
    color: #1b1c1c;
  }

  .descript {
    font-size: 13px;
    color: #3f4a36;
    margin-top: 4px;
  }
`;

const ExpandButton = styled.button`
  width: 100%;
  height: 45px;
  margin-top: 15px;
  border-radius: 15px;
  background-color: #ffffff;
  border: 1px solid #88ceff;
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

/* 트렌드 변화에 따른 아이콘 스타일 */
const getTrendIcon = (trend) => {
  switch (trend) {
    case "UP":
      return <FiTrendingUp color="#2B6C00" size="20" />;
    case "DOWN":
      return <FiTrendingDown color="#BA1A1A" size="20" />;
    case "HOLD":
    default:
      return <FiMinus color="#8E8E93" size="20" />;
  }
};

function RankingCard({ wordsList, isLanding }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleWordClick = (word) => {
    navigate(`/report/${word.id}`);
  };

  /*
    const displayCount = isExpanded ? 30 : 10;  // 랭킹에 나타낼 개수 정의
    const displayWords = wordsList.slice(0, displayCount);  // .slice(시작, 끝)으로 displayCount만큼 자름
    */

  return (
    <Ranking>
      {!isLanding && <h3>인기 유행어 랭킹</h3>}

      <ExpandableWrapper $isExpanded={isLanding ? true : isExpanded}>
        <RankingItem>
          {(wordsList && isLanding ? wordsList.slice(0, 10) : wordsList)?.map(
            (word, index) => (
              <motion.div
                key={word.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }} // 클릭하면 눌리는 느낌
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ClickWord key={index} onClick={() => handleWordClick(word)}>
                    <div
                      style={{ display: "flex", alignItems: "center", flex: 1 }}
                    >
                      <RankingBadge rank={index + 1}>{index + 1}</RankingBadge>
                      <WordInfo>
                        <span className="keyword">{word.keyword}</span>
                        <span className="descript">{word.description}</span>
                      </WordInfo>
                    </div>

                    <div style={{ display: "flex", alignItems: "center" }}>
                      {getTrendIcon(word.trend)}
                    </div>
                  </ClickWord>
                </motion.div>
              </motion.div>
            ),
          )}
        </RankingItem>
      </ExpandableWrapper>

      {!isLanding && (
        <ExpandButton onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "접기 ↑" : "전체 순위 보기 ↓"}
        </ExpandButton>
      )}
    </Ranking>
  );
}

export default RankingCard;
