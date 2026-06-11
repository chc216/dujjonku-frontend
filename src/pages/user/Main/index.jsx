import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import RankingCard from "@/pages/user/DashBoard/RankingCard";
import TodayWordCard from "@/pages/user/DashBoard/TodayWordCard";
import Button from "@/components/nav/Button";
import Contact from "./Contact";
import TeamMember from "./TeamMember";
import SubscribeCard from "./SubscribeCard";
/*import HeroSection from "./HeroSection";*/
import QuizCard from "@/pages/user/Quiz/QuizCard";
import { motion } from "framer-motion";
import axios from "axios";

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
const SectionBox = styled(motion.section)`
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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
};

/* HeroSection 코드 합침 */
const HeroSectionWrapper = styled.section`
  width: 100%;
  box-sizing: border-box;
  padding: 120px 10% 80px 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
`;

const HeroTextContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 800px;
`;

const HeroBadge = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
  color: #2b6c00;
  margin-bottom: 20px;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 1000;
  line-height: 1.3;
  color: #1b1c1c;
  margin: 0 0 20px 0;
`;

const Char = styled(motion.span)`
  display: inline-block;
  color: #2b6c00;
`;

const HeroDescription = styled.p`
  font-size: 1.2rem;
  color: #3f4a36;
  line-height: 1.6;
  margin-bottom: 40px;
  max-width: 600px;
`;

const LinkButton = styled.button`
  padding: 15px 40px;
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  box-shadow: 5px 5px 10px #ebe6e6;
  background-color: #58cc02;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #449705;
  }
`;

function Main() {
  const navigate = useNavigate();
  const [rankingList, setRankingList] = useState([]);
  /* const [rankingTop4, setRankingTop4] = useState([]); */
  const animatedWord = "유행어";

  const toTopPage = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/ranking`)
      .then((res) => {
        setRankingList(res.data);
      })
        /*let tmp = [];
        for (let i = 0; i < 4; i++) {
          tmp.push(res.data[i].id);
        }
        console.log(tmp);
        setRankingTop4(tmp);
      })*/
      .catch((err) => {
        console.error("랭킹 로드 실패:", err);
        setRankingList(DummyRankingData);
      });
  }, []);

  return (
    <PageWrapper>
      <FixedContainer>
        <RandingLogoContent onClick={toTopPage}>
          Dujjonku
        </RandingLogoContent>
      </FixedContainer>

      <RandingContainer>
        {/* <HeroSection id_list={rankingTop4} /> */}
        <HeroSectionWrapper>
          <HeroTextContent>
            <HeroBadge>
              소통을 위한 가이드 <b>두쫀쿠</b>
            </HeroBadge>
            <HeroTitle>
              따라가기 벅찬 요즘 {" "}
              {animatedWord.split("").map((char, i) => (
                <Char
                  key={i}
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: 3,
                    times: [0, 0.1, 0.9, 1],
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                    ease: "easeInOut",
                  }}
                >
                  {char}
                </Char>
              ))}
              ,<br />한 눈에 쉽게
            </HeroTitle>

            <HeroDescription>
              실시간 트렌드부터 정확한 뜻과 예문까지!
              <br />
              세대 간의 언어 장벽을 허물고 소통을 시작해 보세요.
            </HeroDescription>
            <LinkButton onClick={() => navigate("/dashboard")}>
              무료로 시작하기
            </LinkButton>
          </HeroTextContent>
        </HeroSectionWrapper>

        <SectionBox>
          <h2>실시간 인기 유행어 랭킹</h2>
          <p>데이터베이스와 연동된 실시간 트렌드를 확인하세요!</p>
          <motion.div
            style={{ width: "100%", maxWidth: "800px" }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <RankingCard wordsList={rankingList} isLanding={true} />
          </motion.div>
        </SectionBox>

        <SectionBox
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants}>오늘의 인기 유행어</motion.h2>
          <motion.p variants={itemVariants}>
            매일매일 업데이트되는 인기 유행어를 놓치지마세요!
          </motion.p>
          <motion.div
            variants={itemVariants}
            style={{ width: "100%", maxWidth: "800px" }}
          >
            <TodayWordCard />
          </motion.div>
        </SectionBox>

        <SectionBox
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            variants={itemVariants}
            style={{
              color: "#ff5e00",
              margin: "0 0 10px 0",
              fontWeight: "bold",
            }}
          >
            <b>MINI TEST</b>
          </motion.div>
          <motion.h2 variants={itemVariants}>나의 MZ력은 몇 점?</motion.h2>
          <motion.p variants={itemVariants}>
            유행어 퀴즈를 통해 쉽고 재미있게 유행어를 학습하세요!
          </motion.p>
          <motion.div
            variants={itemVariants}
            style={{
              width: "100%",
              maxWidth: "800px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <QuizCard />
          </motion.div>
        </SectionBox>

        <SectionBox
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants}>
            트렌드에 한발짝 가까워지세요
          </motion.h2>
          <motion.p variants={itemVariants}>
            매일 업데이트되는 새로운 유행어 알림을 받아보세요.
          </motion.p>
          <motion.div variants={itemVariants} style={{ width: "100%" }}>
            <SubscribeCard />
          </motion.div>
        </SectionBox>

        <SectionBox
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
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
