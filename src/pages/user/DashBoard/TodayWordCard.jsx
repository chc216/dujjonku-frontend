import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Badge = styled.div`
  display: inline-block;
  background-color: #ddad00;
  color: #ffffff;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const WordTitle = styled.h1`
  font-size: 42px;
  color: #2b6c00;
  margin: 0 0 15px 0;
  font-weight: 800;
`;

const Meaning = styled.p`
  font-size: 18px;
  color: #1b1c1c;
  margin: 0 0 25px 0;
`;

const ExampleBox = styled.div`
  background-color: #f5f3f3;
  border-left: 5px solid #2b6c00;
  padding: 20px;
  border-radius: 8px;
  font-size: 16px;
  color: #3f4a36;
  margin: 0 0 30px 0;
  width: 80%;
`;

const DetailButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #efeded;
  color: #1b1c1c;
  border: 1px solid #becbb1;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #dcdcdc;
  }
`;

/* 캐러셀 스타일 */
const CardContainer = styled.div`
  position: relative;
  background-color: #ffffffc8;
  border-radius: 20px;
  box-shadow: 5px 5px 10px #ebe6e6;
  padding: 30px 20px;
  overflow: hidden;
`;

const CarouselWindow = styled.div`
  overflow: hidden;
  position: relative;
  z-index: 1;
  width: 100%;
`;

const CarouselTrack = styled.div`
  display: flex;
  transition: transform 0.4s ease-in-out;
  transform: translateX(-${(props) => props.$current * 100}%);
`;

const CarouselSlide = styled.div`
  min-width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;

  ${(props) => (props.$direction === "left" ? "left: 10px;" : "right: 10px;")}

  &:hover {
    background-color: #f5f5f5;
  }
`;

const CarouselDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 15px;
  position: relative;
  z-index: 1;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => (props.$active ? "#2b5C00" : "#D9D9D9")};
  cursor: pointer;
  transition: background-color 0.2s;
`;

const mockTodayWords = [
  {
    id: 1,
    word: "두쫀쿠",
    meaning: "두바이쫀득쿠키",
    example: "우리 두쫀쿠 먹으러 갈래?",
  },
  {
    id: 2,
    word: "중꺾마",
    meaning: "중요한 것은 꺾이지 않는 마음",
    example: "이번 프로젝트 힘들지만 중꺾마 마인드 고고",
  },
  {
    id: 3,
    word: "럭키비키",
    meaning: "초긍정적 마인드",
    example: "비가 오네? 오히려 시원하고 럭키비키잖아~",
  },
  {
    id: 4,
    word: "점메추",
    meaning: "점심 메뉴 추천",
    example: "오늘 점메추 좀 해줘. 배고파.",
  },
  {
    id: 5,
    word: "알잘딱깔센",
    meaning: "알아서 잘 딱 깔끔하고 센스있게",
    example: "이번 디자인은 알잘딱깔센으로 부탁해!",
  },
];

function TodayWordCard() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0); // 캐러셀 변환 번호 상태
  const [words, setWords] = useState([]); // 백엔드에서 받아온 단어 리스트
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [isHovered, setIsHovered] = useState(false); // 사용자가 hover중에는 자동 슬라이드 멈추기 위한 코드 추가

  useEffect(() => {
    const fetchTodayWords = async () => {
      try {
        /* 스프링부트 URL (오늘의 유행어) 채워넣기 */
        const response = await axios.get("http://localhost:8080/today");

        /* 데이터가 배열이고, 내용이 있다면 서버 데이터 사용 */
        if (Array.isArray(response.data) && response.data.length > 0) {
          setWords(response.data);
        } else {
          /* 텅 빈 리스트라면 더미 데이터로 대체 */
          console.warn("데이터가 비어있음. (더미데이터)");
          setWords(mockTodayWords);
        }
      } catch (error) {
        /* 서버가 죽었을 경우 더미 데이터로 대체 */
        console.error("API 통신 실패. (더미데이터) :", error);
        setWords(mockTodayWords);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodayWords();
  }, []);

  /* 3초마다 슬라이드 자동으로 넘겨주는 효과 추가 */
  useEffect(() => {
    /* 3초마다 슬라이드 자동으로 넘겨주는 효과 추가 */
    if (words.length === 0 || isLoading || isHovered) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev === words.length - 1 ? 0 : prev + 1));
    }, 3000); // 3000ms

    /* 상태 바뀔 때 타이머를 클리어시킴 */
    return () => clearInterval(timer);
  }, [words, isLoading, isHovered]);

  /* 데이터를 불러오는 중일 때 */
  if (isLoading) {
    return (
      <CardContainer
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <p style={{ color: "#888" }}>데이터 불러오는 중...</p>
      </CardContainer>
    );
  }

  /* 서버가 꺼져있거나 데이터 비어있을 때 */
  if (!words || words.length === 0) {
    return (
      <CardContainer
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <p style={{ color: "#888" }}>오늘의 유행어 데이터 없음.</p>
      </CardContainer>
    );
  }

  const handleDetailClick = (wordId) => {
    navigate(`/report/${wordId}`);
  };

  const nextHandler = () => {
    setCurrent((prev) => (prev === words.length - 1 ? 0 : prev + 1));
  };

  const prevHandler = () => {
    setCurrent((prev) => (prev === 0 ? words.length - 1 : prev - 1));
  };

  return (
    <CardContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ArrowButton $direction="left" onClick={prevHandler}>
        <span>&lt;</span> {/* 나중에 아이콘으로 변경하는게 좋을듯 */}
      </ArrowButton>

      <ArrowButton $direction="right" onClick={nextHandler}>
        <span>&gt;</span>
      </ArrowButton>

      <CarouselWindow>
        <CarouselTrack $current={current}>
          {words.map((word) => (
            <CarouselSlide key={word.id}>
              <Badge>오늘의 유행어</Badge>
              <WordTitle>{word.word}</WordTitle>
              <Meaning>"{word.meaning}"</Meaning>
              <ExampleBox>"{word.example}"</ExampleBox>

              <DetailButton onClick={() => handleDetailClick(word.id)}>
                상세 보기
              </DetailButton>
            </CarouselSlide>
          ))}
        </CarouselTrack>
      </CarouselWindow>

      <CarouselDots>
        {words.map((_, idx) => (
          <Dot
            key={idx}
            $active={idx === current}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </CarouselDots>
    </CardContainer>
  );
}

export default TodayWordCard;
