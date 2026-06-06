import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import FrequencyChart from "@/components/FrequencyChart";
const HeroSectionWrapper = styled.section`
  width: 100%;
  box-sizing: border-box;
  padding: 100px 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  gap: 50px;
`;

const dummyHeroWords = [
  {
    id: 1,
    name: "럭키비키",
    example: "시험 망친 줄 알았는데 다 아는 문제 나왔어, 완전 럭키비키잖아!",
    trend: "hot",
    frequency: {
      week1: 12450,
      week2: 9200,
      week3: 7800,
      week4: 6100,
      week5: 4500,
      week6: 3200,
      week7: 2100,
      week8: 1500,
      week9: 900,
      week10: 500,
      week11: 200,
      week12: 50,
    },
  },
  {
    id: 2,
    name: "분좋카",
    example: "여기 분좋카네, 사진 찍기 좋겠다.",
    trend: "neutral",
    frequency: {
      week1: 9820,
      week2: 9500,
      week3: 9100,
      week4: 8800,
      week5: 8200,
      week6: 7900,
      week7: 7500,
      week8: 7000,
      week9: 6800,
      week10: 6500,
      week11: 6200,
      week12: 6000,
    },
  },
  {
    id: 3,
    name: "오운완",
    example: "오늘도 헬스장 다녀왔다, 오운완 인증!",
    trend: "cold",
    frequency: {
      week1: 8105,
      week2: 9200,
      week3: 10100,
      week4: 11000,
      week5: 11500,
      week6: 12000,
      week7: 11800,
      week8: 11200,
      week9: 10500,
      week10: 9800,
      week11: 9000,
      week12: 8500,
    },
  },
  {
    id: 4,
    name: "중꺾마",
    example: "졌지만 포기 안 해, 중꺾마 정신으로 간다.",
    trend: "hot",
    frequency: {
      week1: 7340,
      week2: 5100,
      week3: 4200,
      week4: 3800,
      week5: 3500,
      week6: 3300,
      week7: 3100,
      week8: 2900,
      week9: 2700,
      week10: 2400,
      week11: 2000,
      week12: 1600,
    },
  },
];

const HeroTextContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const HeroBadge = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
  color: #2b6c00;
  margin-bottom: 20px;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
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
`;

const LinkButton = styled.button`
  padding: 15px 30px;
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

/* 오른쪽 카드 4개 그리드 영역 */
const HeroCardGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 600px;
`;

const MiniTrendCard = styled.div`
  background-color: #ffffff;
  padding: 25px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 220px;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  border: 1px solid #becbb1;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 5px 5px 15px #ebe6e6;
    border-color: #2b6c00;
  }

  .top-badge {
    display: inline-block;
    background-color: #efeded;
    color: #2b6c00;
    font-size: 0.8rem;
    font-weight: 800;
    padding: 4px 10px;
    border-radius: 12px;
    margin-bottom: 15px;
    width: fit-content;
  }

  .word {
    font-size: 1.6rem;
    font-weight: 800;
    color: #1b1c1c;
    margin-bottom: 8px;
  }

  .desc {
    font-size: 0.9rem;
    color: #666;
    line-height: 1.4;
    height: 2.52rem; /* max-height → height로 고정 (0.9 * 1.4 * 2줄) */
    overflow: hidden;
  }
  .chart-area {
    height: 120px;
    margin-top: 12px;
    width: 100%;
  }
`;

function HeroSection() {
  const navigate = useNavigate();

  const animatedWord = "유행어";

  const [heroWords, setHeroWords] = useState([]);

  useEffect(() => {
    const ids = [1, 2, 3, 4];

    Promise.all(
      ids.map((id) =>
        axios.get(`http://localhost:8080/report/${id}`).then((res) => res.data),
      ),
    )
      .then((words) => setHeroWords(words))
      .catch((err) => {
        console.error("단어 로드 실패:", err);
        setHeroWords(dummyHeroWords);
      });
  }, []);

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <HeroSectionWrapper>
      <HeroTextContent>
        <HeroBadge>
          소통을 위한 가이드 <b>두쫀쿠</b>
        </HeroBadge>
        <HeroTitle>
          따라가기 벅찬 요즘{" "}
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

      <HeroCardGrid>
        {heroWords.map((card, idx) => (
          <MiniTrendCard
            key={idx}
            onClick={() => navigate(`/report/${card.id}`)}
          >
            <div>
              <div className="top-badge">TOP {idx + 1}</div>
              <div className="word">{card.name}</div>
              <div className="desc">{truncateText(card.example, 40)}</div>
              <div className="chart-area">
                <FrequencyChart
                  frequency={card.frequency}
                  type="line"
                  show_axis={false}
                  ygrid_show={false}
                />
              </div>
            </div>
          </MiniTrendCard>
        ))}
      </HeroCardGrid>
    </HeroSectionWrapper>
  );
}

export default HeroSection;
