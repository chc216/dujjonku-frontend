import styled from "styled-components";
import DocumentIcon from "@/assets/document_icon.svg?react";
import BracketIcon from "@/assets/bracket.svg?react";
const Container = styled.div`
  display: flex;
  padding-top: 70px;
  padding-bottom: 20px;
  gap: 20px;
  width: 100%;
  justify-content: center;
`;

const Card = styled.div`
  padding-top: 15px;
  height: 130px;
  width: 100%;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.06),
    0 2px 4px -1px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  padding-bottom: 8px;
  padding-left: 30px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-bottom: 1px solid #e4e2e2;
`;

const Title = styled.div`
  color: #1b1c1c;
  font-family: Lexend;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const Meaning = styled.div`
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  color: #1b1c1c;
  font-family: normal;
  letter-spacing: 1px;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px;
`;

function InfoSection({ meaning, scenario }) {
  return (
    <Container>
      <Card>
        <Header>
          <DocumentIcon
            style={{ width: "13px", height: "16px", fill: "#3f4a6" }}
          ></DocumentIcon>
          <Title>사전적 정의</Title>
        </Header>
        <Meaning>{meaning}</Meaning>
      </Card>
      <Card>
        <Header>
          <BracketIcon
            style={{ width: "13px", height: "16px", fill: "#3f4a6" }}
          ></BracketIcon>
          <Title>이런 상황에서 써보세요</Title>
        </Header>
        <Meaning>{scenario}</Meaning>
      </Card>
    </Container>
  );
}

export default InfoSection;
