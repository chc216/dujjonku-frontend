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
import WordCardMarquee from "./WordCardMarquee";

/* 이후 백엔드 연동시 서버에서 5 or 10개만 가져오도록 변경 */
const DummyRankingData = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  keyword: `트렌드 단어 ${i + 1}`,
  description: "실시간으로 분석된 유행어 설명란",
  trend: i % 3 === 0 ? "UP" : i % 3 === 1 ? "DOWN" : "HOLD",
}));

const PageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100px;
  margin: 0;
  background-color: #f7faf5;
`;

const PageBlur = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  -webkit-filter: blur(80px);
  z-index: 0;
  pointer-events: none;
`;

const BlurTop = styled(PageBlur)`
  width: 400px;
  height: 400px;
  background-color: #a8e063;
  opacity: 0.4;
  top: 200px;
  left: -80px;
`;
const BlurMid = styled(PageBlur)`
  width: 450px;
  height: 450px;
  background-color: #c7ffbc;
  opacity: 0.35;
  top: 45%;
  right: -100px;
`;
const BlurLow = styled(PageBlur)`
  width: 380px;
  height: 380px;
  background-color: #56ab2f;
  opacity: 0.25;
  bottom: 300px;
  left: 10%;
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
  position: relative;
  z-index: 1;
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

  /* 얼룩말 무늬 (배경색 흰색, 옅은 회색) -> 블러 효과로 변경 */

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

const SplitSection = styled(motion.section)`
  width: 100%;
  box-sizing: border-box;
  padding: 120px 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  background-color: ${(props) => props.bg || "#ffffff"};

  @media (max-width: 1100px) {
    flex-direction: column;
    text-align: center;
    padding: 80px 5%;
  }
`;

const TextBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 500px;

  @media (max-width: 1100px) {
    align-items: center;
  }

  .badge {
    color: #2b6c00;
    font-weight: 800;
    font-size: 1.1rem;
    margin-bottom: 20px;
  }

  h1,
  h2 {
    font-size: 3.5rem;
    font-weight: 950;
    line-height: 1.2;
    color: #1b1c1c;
    margin: 0 0 25px 0;
    text-align: left;
    word-break: keep-all;
    @media (max-width: 1100px) {
      text-align: center;
      font-size: 2.8rem;
    }
  }

  .highlight {
    color: #2b6c00;
  }

  p {
    font-size: 1.2rem;
    color: #555;
    line-height: 1.7;
    margin-bottom: 40px;
    text-align: left;
    @media (max-width: 1100px) {
      text-align: center;
    }
  }
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

const Char = styled(motion.span)`
  display: inline-block;
  color: #2b6c00;
`;

const BlurCircle = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  -webkit-filter: blur(60px);
  z-index: 0;
  opacity: 0.8;
`;

const BackgroundGreen = styled(BlurCircle)`
  width: 40%;
  height: 40%;
  background-color: #c7ffbc;

  top: 10%;
  left: 7%;
`;
const BackgroundRed = styled(BlurCircle)`
  width: 30%;
  height: 30%;
  background-color: #fc00008b;
  bottom: 10%;
  right: 20%;
`;

const StickerCloud = styled.div`
  background-color: rgba(255, 255, 255, 0.5);

  flex: 1;
  position: relative;
  height: 500px;
  min-width: 550px;
  width: 100%;

  @media (max-width: 600px) {
    min-width: 100%;
    height: 350px;
  }
`;

const Sticker = styled(motion.div)`
  position: absolute;
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  padding: ${(props) => props.$p || "12px 24px"};
  font-size: ${(props) => props.$fs || "18px"};
  font-weight: 900;
  border-radius: 50px;
  color: ${(props) => props.$color || "#fff"};
  background-color: ${(props) => props.$bg || "#58cc02"};
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const stickerPos = [
  {
    top: "10%",
    left: "15%",
    bg: "#4A7C2A",
    fs: "26px",
    p: "18px 35px",
    rot: -5,
  },
  {
    top: "20%",
    left: "60%",
    bg: "#FFB800",
    fs: "22px",
    p: "15px 30px",
    rot: 9,
  },
  {
    top: "55%",
    left: "10%",
    bg: "#83B259",
    fs: "20px",
    p: "14px 28px",
    rot: -10,
  },
  {
    top: "45%",
    left: "45%",
    bg: "#ffffff",
    color: "#1b1c1c",
    fs: "18px",
    p: "12px 24px",
    rot: 5,
  },
  {
    top: "75%",
    left: "30%",
    bg: "#111111",
    fs: "16px",
    p: "10px 22px",
    rot: -3,
  },
  {
    top: "65%",
    left: "65%",
    bg: "#E7F0E0",
    color: "#2b6c00",
    fs: "15px",
    p: "10px 20px",
    rot: 12,
  },
  {
    top: "15%",
    left: "40%",
    bg: "#FF5E00",
    fs: "14px",
    p: "8px 18px",
    rot: -15,
  },
];

/* 섹션 2의 채팅 UI */
const ChatWindow = styled.div`
  flex: 1;
  background: #ffffff;
  border-radius: 30px;
  padding: 40px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 25px;
  max-width: 480px;
  border: 1px solid #f0f0f0;
`;

const ChatMe = styled.div`
  background: #f1f3f5;
  padding: 18px 22px;
  border-radius: 22px;
  border-bottom-left-radius: 5px;
  align-self: flex-start;
  font-size: 1.15rem;
  font-weight: 500;
  .point {
    color: #2b6c00;
    font-weight: 800;
  }
`;

const Translation = styled(motion.div)`
  background: #f4f9f1;
  border: 1.5px solid #58cc02;
  padding: 20px;
  border-radius: 15px;
  margin-left: 20px;
  max-width: 85%;
  .head {
    font-size: 0.9rem;
    font-weight: 800;
    color: #58cc02;
    margin-bottom: 5px;
  }
  .word {
    font-size: 1.2rem;
    font-weight: 800;
    color: #1b1c1c;
  }
  .mean {
    font-size: 1rem;
    color: #666;
    margin-top: 4px;
  }
`;

const ChatMom = styled.div`
  background: #58cc02;
  color: white;
  padding: 18px 22px;
  border-radius: 22px;
  border-bottom-right-radius: 5px;
  align-self: flex-end;
  font-size: 1.15rem;
  font-weight: 500;
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

function Main() {
  const navigate = useNavigate();
  const [rankingList, setRankingList] = useState([]);
  /* const [rankingTop4, setRankingTop4] = useState([]); */
  const animatedWord = "유행어";

  const toTopPage = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  const topStickers =
    rankingList.length > 0
      ? rankingList.slice(0, 7)
      : DummyRankingData.slice(0, 7);

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
      {/* <BlurTop /> */}
      {/* <BlurMid /> */}
      {/* <BlurLow /> */}
      <FixedContainer>
        <RandingLogoContent onClick={toTopPage}>Dujjonku</RandingLogoContent>
      </FixedContainer>

      <RandingContainer>
        {/* <HeroSection id_list={rankingTop4} /> */}
        <SplitSection
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <TextBlock>
            <div className="badge">
              소통을 위한 가이드 <b>두쫀쿠</b>
            </div>
            <h1>
              따라가기 벅찬 요즘
              <br />{" "}
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
            </h1>
            <p>
              요즘 뜨는 말, 다 모았어요.
              <br />
              실시간 트렌드부터 정확한 뜻과 예문까지!
              <br />
              세대 간의 언어 장벽을 허물고 소통을 시작해 보세요.
            </p>
            <LinkButton onClick={() => navigate("/dashboard")}>
              무료로 시작하기
            </LinkButton>
          </TextBlock>

          <StickerCloud>
            <BackgroundGreen />
            <BackgroundRed />

            {topStickers.map((item, idx) => (
              <Sticker
                key={idx}
                $bg={stickerPos[idx].bg}
                $color={stickerPos[idx].color}
                $fs={stickerPos[idx].fs}
                $p={stickerPos[idx].p}
                $top={stickerPos[idx].top}
                $left={stickerPos[idx].left}
                style={{ rotate: stickerPos[idx].rot }}
                whileHover={{ scale: 1.1, zIndex: 10, rotate: 0, y: 0 }}
                initial={{ scale: 0, opacity: 0, y: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: [0, -12, 0],
                }}
                transition={{
                  scale: { delay: idx * 0.1, type: "spring" },
                  opacity: { delay: idx * 0.1 },
                  y: {
                    duration: 2 + (idx % 3) * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.1,
                  },
                }}
                onClick={() => navigate(`/report/${item.id}`)}
              >
                {item.word}
              </Sticker>
            ))}
          </StickerCloud>
        </SplitSection>

        <SplitSection
          bg="#fafafa"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <TextBlock>
            <div className="badge">세대 사이, 말이 통하는 순간</div>
            <h2>
              모르고 지나친 그 말들,
              <br />
              사실 <span className="highlight">이런 뜻</span>이었어요
            </h2>
            <p>
              대화 속 유행어를 확인할 수 있어요.
              <br />
              이제 못 알아듣고 넘어가는 일은 없어요.
            </p>
            <LinkButton onClick={() => navigate("/report/1")}>
              무슨 뜻인지 알아보기
            </LinkButton>
          </TextBlock>

          <ChatWindow>
            <ChatMe>
              엄마 나 오늘 완전 <span className="point">스불재</span>였어 ㅠㅠ
            </ChatMe>
            <Translation
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              translation={{ delay: 1.9 }}
              viewport={{ once: true, amount: 1 }}
            >
              <div className="head">두쫀쿠 번역</div>
              <div className="word">
                스불재{" "}
                <span style={{ fontWeight: 400 }}> 스스로 불러온 재앙</span>
              </div>
              <div className="mean">= 자초한 힘든 상황</div>
            </Translation>
            <ChatMom>아 그런 뜻이었구나! 고생했네 우리 아들~</ChatMom>
          </ChatWindow>
        </SplitSection>

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
        <WordCardMarquee />

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
