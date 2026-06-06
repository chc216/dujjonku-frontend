import styled from "styled-components";
import Arrow from "@/assets/back_arrow.svg?react";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  height: 64px;
  padding: 0 32px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  align-self: stretch;
  border-bottom: 1px solid #e4e2e2;
  background: rgba(251, 249, 248, 0.9);
  backdrop-filter: blur(6px);
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Title = styled.div`
  color: #1b1c1c;
  font-family: "Plus Jakarta Sans";
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px; /* 140% */
`;

//각 이동된 페이지에서 페이지 제목과 뒤로가기 버튼을 포함한 컴포넌트
//props 매개변수 title: 각 페이지의 제목을 받아 표시한다.
function TopNavBar(props) {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <ContentContainer>
          <Arrow
            style={{
              width: "16px",
              height: "16px",
              fill: "#3F4A36",
              cursor: "pointer",
            }}
            onClick={() => navigate(-1)}
          ></Arrow>
          <Title>{props.title}</Title>
        </ContentContainer>
      </Container>
    </>
  );
}

export default TopNavBar;
