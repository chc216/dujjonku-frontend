import NavBar from "@/components/Nav/NavBar";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import RankingCard from "@/pages/user/DashBoard/RankingCard"
import TodayWordCard from "@/pages/user/DashBoard/TodayWordCard"

const PageWrapper = styled.div`
    display: flex;
    min-height: 100vh;
    margin: 0;
`;

const ContentWrapper = styled.main`
    flex: 1;
    padding: 40px;
    background-color: #FBF9F8;

    /* clamp 함수: NavBar의 너비 규칙을 똑같이 따라감 */
    margin-left: clamp(200px, 24vw, 350px);

    /* 이후 모바일 화면도 추가해야할듯 */
`;

const HeaderContent = styled.div`    
    div {
        color: #1B1C1C;
        font-family: "Plus Jakarta Sans";
        font-size: 32px;
        font-style: normal;
        font-weight: 700;
        line-height: 125%;
    }
    
    p {
        color: #3F4A36;
        font-family: "Nunito Sans";
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 144.444%;
    }
`;

const Padding = styled.div`
    height: 35px;
`;

/* 서버 통신 실패 시 나타나는 더미 데이터 */
const fallbackWordData = Array.from({ length: 30 }, (_, i) => ({
    id: i+1,
    keyword: `서버 연결 대기중 ${i+1}`,
    description: "백엔드 서버 켜주세요!",
    trend: i%3 === 0 ? 'UP' : i%3 === 1 ? 'DOWN' : 'HOLD'
}));

function DashBoard() {
    const [rankingData, setRankingData] = useState([]);

    useEffect(() => {
        const fetchRanking = async () => {
            try {
                /* 스프링부트 URL (랭킹) 채워넣기 */
                const response = await axios.get("http://localhost:8080");

                /* 데이터가 배열이고, 내용이 있다면 서버 데이터 사용 */
                if (Array.isArray(response.data) && response.data.length > 0) {
                    setRankingData(response.data);
                } else {
                    /* 텅 빈 리스트라면 더미 데이터로 대체 */
                    console.warn("데이터가 비어있음. (더미데이터)");
                    setRankingData(fallbackWordData);
                }
            } catch (error) {
                /* 서버가 죽었을 경우 더미 데이터로 대체 */
                console.error("API 통신 실패. :", error);
                setRankingData(fallbackWordData);
            }
        };
        fetchRanking();
    }, []);

    return (
        <PageWrapper>
            <NavBar />
            <ContentWrapper>
                <HeaderContent>
                    <div>오늘도 트랜디해질 시간이에요!</div>
                    <p>오늘의 유행어, 함께 알아볼까요?</p>
                </HeaderContent>
                <Padding />

                <TodayWordCard />
                <Padding />

                <RankingCard wordsList={rankingData} isLanding={false} />
            </ContentWrapper>
        </PageWrapper>
    );
}

export default DashBoard;