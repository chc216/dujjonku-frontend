import NavBar from "@/components/Nav/NavBar";
import React, { useState } from "react";
import styled from "styled-components";
import RankingCard from "@/pages/user/Main/RankingCard"
import TodayWordCard from "@/pages/user/Main/TodayWordCard"

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

const WordData = Array.from({ length: 30 }, (_, i) => ({
    id: i+1,
    keyword: `test word ${i+1}`,
    description: "test description",
    trend: i%3 === 0 ? 'UP' : i%3 === 1 ? 'DOWN' : 'HOLD'
}));

function Main() {
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

                <RankingCard wordsList={WordData} />
            </ContentWrapper>
        </PageWrapper>
    );
}

export default Main;