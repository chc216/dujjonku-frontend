import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import RankingCard from "@/pages/user/DashBoard/RankingCard";
import TodayWordCard from "@/pages/user/DashBoard/TodayWordCard";
import Button from "@/components/nav/Button";
import Contact from "./Contact"
import TeamMember from "./TeamMember"
import SubscribeCard from "./SubscribeCard";
import HeroSection from "./HeroSection";
import QuizCard from "@/pages/user/Quiz/QuizCard";
import { motion } from "framer-motion";

/* 이후 백엔드 연동시 서버에서 5 or 10개만 가져오도록 변경 */
const DummyRankingData = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  keyword: `트렌드 단어 ${i + 1}`,
  description: "실시간으로 분석된 유행어 설명란",
  trend: i % 3 === 0 ? "UP" : i % 3 === 1 ? "DOWN" : "HOLD",
}));

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100px;
  margin: 0;
`;

const FixedContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 50px;
  padding: 20px 0 10px 0;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 4px solid #becbb1;
  background: #f5f3f3;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  min-width: 100px;
  z-index: 1000;
`;

const RandingLogoContent = styled.div`
  margin: 0 auto;
  color: #2b6c00;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: 6px;
  cursor: pointer;
`;

const RandingContainer = styled.div`
  flex: 1;
  min-width: 600px;
  margin-top: 50px;
`;

/* 공통 섹션 스타일 (박스 컨테이너) */
const SectionBox = styled.section`
  width: 100%;
  box-sizing: border-box; /* 여백 포함 100%로 지정 */
  min-height: 400px;
  padding: 80px 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  /* 얼룩말 무늬 (배경색 흰색, 옅은 회색) */
  &:nth-child(even) {
    background-color: #fafafa;
  }
  &:nth-child(odd) {
    background-color: #ffffff;
  }

  h2 {
    font-size: 2.5rem;
    font-weight: 900;
    margin-top: 0;
    margin-bottom: 20px;
    color: #1b1c1c;
  }

  p {
    font-size: 1.2rem;
    color: #3f4a36;
    margin-bottom: 40px;
  }
`;

function Main() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <FixedContainer>
        <RandingLogoContent onClick={() => navigate("/dashboard")}>
          Dujjonku
        </RandingLogoContent>
      </FixedContainer>

    <RandingContainer>
        <HeroSection heroWords={DummyRankingData.slice(0, 4)} />
        
        <SectionBox>
            <h2>실시간 인기 유행어 랭킹</h2>
            <p>데이터베이스와 연동된 실시간 트렌드를 확인하세요!</p>
            <motion.div
                style={{ width: '100%', maxWidth: '800px' }}
                initial={{ opacity: 0, y: 50 }} // 초기값: 투명하고 아래로 내려보냄
                whileInView={{ opacity: 1, y: 0 }}  // 화면에 보이면 올라옴
                viewport={{ once: true, amount: 0.7 }}  // 화면에 70% 보이면 실행
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <RankingCard wordsList={DummyRankingData} isLanding={true} />
            </motion.div>
        </SectionBox>

        <SectionBox>
          <h2>오늘의 인기 유행어</h2>
          <p>매일매일 업데이트되는 인기 유행어를 놓치지마세요!</p>
          <div style={{ width: "100%", maxWidth: "800px" }}>
            <TodayWordCard />
          </div>
        </SectionBox>

        <SectionBox>
          <p
            style={{
              color: "#ff5e00",
              margin: "0 0 10px 0",
              fontWeight: "bold",
            }}
          >
            <b>MINI TEST</b>
          </p>
          <h2>나의 MZ력은 몇 점?</h2>
          <p>유행어 퀴즈를 통해 쉽고 재미있게 유행어를 학습하세요!</p>
          <div style={{width: '100%', maxWidth: '800px', display: 'flex', justifyContent: 'center'}}>
                <QuizCard />
          </div>
        </SectionBox>

        <SectionBox>
          <h2>트렌드에 한발짝 가까워지세요</h2>
          <p>매일 업데이트되는 새로운 유행어 알림을 받아보세요.</p>
          <div style={{ width: '100%' }}>
                        <SubscribeCard/>
          </div>
        </SectionBox>

        <SectionBox>
          <TeamMember />
        </SectionBox>

        <SectionBox
          style={{
            minHeight: "50px",
            backgroundColor: "#333",
            color: "#fff",
            padding: "40px 10%",
          }}
        >
          <Contact />
        </SectionBox>
      </RandingContainer>
    </PageWrapper>
  );
}

export default Main;
