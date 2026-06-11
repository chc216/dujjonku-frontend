import NavBar from "@/components/Nav/NavBar.jsx";
import ChartSection from "./ChartSection";
import { useEffect, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import HeaderSection from "./HeaderSection";
import InfoSection from "./InfoSection";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Vote from "@/components/Vote";

const ContentSection = styled.div`
  padding: 0 40px;
`;

function Report() {
  const { id } = useParams();
  const [word, setWord] = useState();
  const navigate = useNavigate();

  console.log(word);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/report/${id}`)
      .then((res) => {
        console.log("test");
        setWord(res.data);
      })
      .catch((err) => {
        console.error("단어 로드 실패:", err);
        alert("단어를 찾을 수 없습니다.");
        navigate("/dashboard");
      });
  }, [id]);

  if (!word) {
    return (
      <PageLayout title={"단어 리포트"}>
        <div>불러오는 중...</div>
      </PageLayout>
    );
  }

  const dummy = {
    name: "중꺽마",
    example: "이번 시험에 떨어졌다고 실망하지마, 중꺾마 알지?",
    meaning:
      "아무리 불리하고 힘든 상황에 부닥치더라도 포기하지 않고 끝까지 해내는 굳센 의지를 뜻합니다. 당장의 결과보다는 끝까지 포기하지 않는 과정과 긍정적인 태도가 더 중요하다는 따뜻한 메시지를 담고 있습니다.",
    frequency: {
      week1: 980,
      week2: 870,
      week3: 720,
      week4: 610,
      week5: 540,
      week6: 430,
      week7: 380,
      week8: 290,
      week9: 210,
      week10: 150,
      week11: 90,
      week12: 40,
    },
    isNew: false,
    trend: "cold",
  };

  return (
    <>
      <PageLayout title={"단어 리포트"}>
        <HeaderSection
          word={word.name}
          example={word.example}
          isNew={calculateNew(word.frequency)}
          trend={word.trend}
        ></HeaderSection>
        <ContentSection>
          <InfoSection
            meaning={word.meaning}
            scenario={word.scenario}
          ></InfoSection>
          {word && <ChartSection frequency={word.frequency} />}
          <Vote id={id}></Vote>
        </ContentSection>
      </PageLayout>
    </>
  );
}

function calculateNew(frequency) {
  const list = Array.from({ length: 12 }, (_, i) => frequency[`week${i + 1}`]);

  const recent = list.slice(0, 4).reduce((a, b) => a + b, 0);
  const past = list.slice(4).reduce((a, b) => a + b, 0);

  if (past === 0) return recent > 0;

  return recent >= past * 2;
}

export default Report;
