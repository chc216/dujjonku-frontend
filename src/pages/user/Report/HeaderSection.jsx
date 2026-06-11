import styled from "styled-components";
import { FiTrendingUp, FiTrendingDown, FiMinus } from "react-icons/fi";
const Container = styled.div`
  padding-left: 7%;
  display: flex;
  height: 136px;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  flex-shrink: 0;
  align-self: stretch;
  gap: 4px;
`;

const Word = styled.div`
  padding-top: 19px;
  padding-left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1b1c1c;
  font-family: "Plus Jakarta Sans";
  font-size: 56px;
  font-style: normal;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -1.4px;
`;

const Tag = styled.div`
  display: flex;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid rgba(88, 204, 2, 0.5);
  background: rgba(88, 204, 2, 0.2);
  color: #2b6c00;
  font-family: "Nunito Sans";
  font-size: 10px;
  font-style: normal;
  font-weight: 400;

  letter-spacing: 0.5px;
`;

const Example = styled.div`
  display: flex;

  height: 24px;
  padding: 9px 0;
  align-items: center;
  flex-shrink: 0;
  color: #3f4a36;
  font-family: "Nunito Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

function HeaderSection({ word, example, isNew, trend }) {
  console.log(trend);
  const getTrendIcon = (trend) => {
    switch (trend) {
      case "hot":
        return <FiTrendingUp color="#c43434" size="40" strokeWidth={3} />;
      case "cold":
        return <FiTrendingDown color="#4134bb" size="40" strokeWidth={3} />;
      case "neutral":
        return <FiMinus color="#18762a" size="40" strokeWidth={3} />;
    }
  };
  return (
    <>
      <Container>
        <Tag>{isNew ? "최신 유행 단어" : "과거에 유행하던 단어"}</Tag>
        <Word>
          {word}
          <div
            style={{
              paddingLeft: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {getTrendIcon(trend)}
          </div>
        </Word>
        <Example>{example}</Example>
      </Container>
    </>
  );
}

export default HeaderSection;
