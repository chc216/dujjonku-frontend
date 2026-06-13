import styled from "styled-components";
import { default as Marquee } from "react-fast-marquee";
import FrequencyChart from "@/components/FrequencyChart.jsx";
import { useNavigate } from "react-router-dom";
console.log("마키 정체 확인:", Marquee);
const MiniTrendCard = styled.div`
  /* 유리 효과의 핵심: 반투명한 흰색 배경 */
  background: rgba(255, 255, 255, 0.4);

  /* 블러 처리 (뒤에 있는 배경을 흐리게 만듦) */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  /* 유리의 테두리 질감을 살려주는 하얀색 얇은 선 */
  border: 1px solid rgba(255, 255, 255, 0.8);

  /* 그림자 조절 */
  /* box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07); */

  padding: 24px;
  margin: 0 10px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 130px;
  width: 210px;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  cursor: pointer;
  /* 
  &:hover {
    transform: translateY(-5px);

    border-color: rgba(255, 255, 255, 1);
    box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.15);
    */

  /* ... 나머지 텍스트 및 차트 CSS는 기존과 동일 ... */
  .text-content {
    display: flex;
    flex-direction: column;
  }

  .word {
    font-size: 1rem;
    font-weight: 800;
    color: #1b1c1c;
    margin-bottom: 8px;
  }

  .desc {
    font-size: 0.8rem;
    color: #666;
    line-height: 1.4;
    height: 2.52rem;
    overflow: hidden;
  }

  .chart-area {
    height: 80px;
    width: 100%;
    margin-top: auto;
  }
`;
// MarqueeContainer를 이렇게 교체하세요
const MarqueeContainer = styled.div`
  width: 100%;
  padding: 40px 0;
  background: transparent;
`;

/* 흐릿한 초록 원 (Main.jsx의 BlurCircle과 동일 컨셉) */
const BlurCircle = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  -webkit-filter: blur(70px);
  z-index: 0;
  pointer-events: none; /* 카드 클릭 방해 안 하도록 */
`;

const GreenBlurLeft = styled(BlurCircle)`
  width: 20px;
  height: 20px;
  background-color: #a8e06378;
  opacity: 0.55;
  top: -120px;
  left: 8%;
`;

const GreenBlurRight = styled(BlurCircle)`
  width: 20px;
  height: 20px;
  background-color: #56ab2f5a;
  opacity: 0.35;
  bottom: -130px;
  right: 12%;
`;

/* 마키를 감싸서 블러 원 위로 올려주는 래퍼 */
const MarqueeInner = styled.div`
  position: relative;
  z-index: 1;
`;
function WordCardMarquee() {
  const navigate = useNavigate();
  const heroWords = [
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
    {
      id: 5,
      name: "추구미",
      example: "오늘 내 코디 완전 내가 원하던 추구미 그 자체야.",
      trend: "hot",
      frequency: {
        week1: 15400,
        week2: 13200,
        week3: 11500,
        week4: 9800,
        week5: 7500,
        week6: 6200,
        week7: 4800,
        week8: 3500,
        week9: 2100,
        week10: 1500,
        week11: 800,
        week12: 400,
      },
    },
    {
      id: 6,
      name: "도파민 터진다",
      example: "와, 이 드라마 반전 미쳤다. 완전 도파민 터지네!",
      trend: "hot",
      frequency: {
        week1: 18200,
        week2: 17900,
        week3: 16500,
        week4: 15000,
        week5: 13200,
        week6: 12100,
        week7: 10500,
        week8: 9200,
        week9: 8000,
        week10: 7100,
        week11: 6500,
        week12: 5800,
      },
    },
    {
      id: 7,
      name: "육각형 인간",
      example: "외모, 성격, 능력까지 다 갖춘 쟤는 진짜 육각형 인간이다.",
      trend: "neutral",
      frequency: {
        week1: 8500,
        week2: 8600,
        week3: 8400,
        week4: 8700,
        week5: 8500,
        week6: 8200,
        week7: 8000,
        week8: 8300,
        week9: 8100,
        week10: 7900,
        week11: 8200,
        week12: 8000,
      },
    },
    {
      id: 8,
      name: "캘박",
      example: "우리 다음 주 모임 날짜 정했지? 내 일정에 캘박 해둘게!",
      trend: "cold",
      frequency: {
        week1: 2100,
        week2: 2500,
        week3: 3200,
        week4: 4100,
        week5: 5500,
        week6: 6800,
        week7: 8200,
        week8: 9500,
        week9: 10200,
        week10: 11500,
        week11: 12000,
        week12: 12500,
      },
    },
  ];
  const maxFrequency = Math.max(
    ...heroWords.map((w) => Math.max(...Object.values(w.frequency))),
  );
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };
  return (
    <MarqueeContainer>
      {/* 뒤에 깔리는 흐릿한 초록 원들 */}
      <GreenBlurLeft />
      <GreenBlurRight />

      {/* 카드들은 z-index로 그 위에 */}
      <MarqueeInner>
        <Marquee.default speed={40} pauseOnHover={true}>
          {heroWords.map((card, idx) => (
            <MiniTrendCard
              key={idx}
              onClick={() => navigate(`/report/${card.id}`)}
            >
              <div className="text-content">
                <div className="word">{card.name}</div>
                <div className="desc">{truncateText(card.example, 40)}</div>
              </div>
              <div className="chart-area">
                <FrequencyChart
                  frequency={card.frequency}
                  type="line"
                  show_axis={false}
                  ygrid_show={false}
                  yMax={maxFrequency}
                />
              </div>
            </MiniTrendCard>
          ))}
        </Marquee.default>
      </MarqueeInner>
    </MarqueeContainer>
  );
}

export default WordCardMarquee;
