import styled from "styled-components";
import Button from "@/components/nav/Button";
import DashboardIcon from '@/assets/dashboard.svg?react';
import QuizIcon from '@/assets/quiz_icon.svg?react';
import { useNavigate } from "react-router-dom"
import RankingCard from "@/pages/user/DashBoard/RankingCard"
import TodayWordCard from "@/pages/user/DashBoard/TodayWordCard"

const PageWrapper = styled.div`
    display: flex;
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
    flex-direction: column;
    justify-content: space-between;
    border-bottom: 4px solid #BECBB1;
    background: #F5F3F3;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    min-width: 100px;
    z-index: 1000;
`;

const RandingLogoContainer = styled.div`
    display: flex;
    padding-bottom: 4vh;
    flex-direction: column;
    align-items: center;     
    align-self: stretch;
`;

const RandingLogoContent = styled.div`
    display: flex;
    padding: 0 10%;
    flex-direction: column;
    align-items: center;
    color: #2B6C00;
    text-align: center;
    font-family: "Plus Jakarta Sans", sans-serif;
    font-size: 2.4rem; 
    font-style: normal;
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: 6px;
    cursor: pointer;
`;

const RandingContainer = styled.div`
    flex: 1;
    padding: 60px 0;
    background-color: #ffffff;
    min-width: 600px;

    /* clamp 함수: NavBar의 너비 규칙을 똑같이 따라감 */
    margin-top: clamp(80px, 50px, 400px);
`;

const ProjectInfoContainer = styled.div`
    text-align: center;
    color: #000000;
    margin-bottom: 50px;

    h1 {
        font-size: 300%;
        font-weight: 1000;
        margin-top: 0;
        margin-bottom: 15px;
    }

`;

const StartButtonContainer = styled.div`
    display: flex;
    padding: 0 8px;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    flex: 1 0 0;
    align-self: stretch;
`;

const getCrawlData = (data) => {

};

const TodayWordContainer = styled.div`
    text-align: center;
    background-color: #fafafa;
    color: #000000;
    width: 100%;
    padding: 50px 0 50px 0;

    h2 {
        font-size: 200%;
        font-weight: 900;
    }
`;

const TodayWordCardContainer = styled.div`
    margin: 50px;
`;

const RankingCardContainer = styled.div`
    margin: 50px;
`;

const QuizContainer = styled.div`
    text-align: center;
    background-color: #ffffff;
    color: #000000;
    width: 100%;
    padding: 50px 0 50px 0;

    h2 {
        margin-top: 0;
        font-size: 200%;
        font-weight: 900;
    }
`;

const SubscribeContainer = styled.div`
    text-align: center;
    background-color: #fafafa;
    color: #000000;
    width: 100%;
    padding: 50px 0 50px 0;

    h2 {
        font-size: 200%;
        font-weight: 900;
    }
`;

const MemberContainer = styled.div`
    text-align: center;
    background-color: #ffffff;
    color: #000000;
    width: 100%;
    padding: 50px 0 50px 0;
`;

const ContactContainer = styled.div`
    margin-bottom: 0;
    text-align: center;
    background-color: #fafafa;
    color: #000000;
    width: 100%;
`;


function Main() {
    const navigate = useNavigate();

    return (
        <PageWrapper>
            <FixedContainer>
                <RandingLogoContainer><RandingLogoContent onClick={() => navigate('/dashboard')}>Dujjonku</RandingLogoContent></RandingLogoContainer>
            </FixedContainer>
            <RandingContainer>
                <ProjectInfoContainer>
                    <p>소통을 위한 가이드 <b>두쫀쿠</b></p>
                    <h1>따라가기 벅찬 요즘 유행어,</h1>
                    <h1>한 눈에 쉽게</h1>
                    <p>어쩌구저쩌구 프로젝트 2~3줄 소개 + 단어 상세 컴포넌트</p>
                    <StartButtonContainer></StartButtonContainer>
                </ProjectInfoContainer>

                <TodayWordContainer>
                    <h2>오늘의 인기 유행어</h2>
                    <p>한 눈에 쉽게 오늘의 인기 유행어를 확인하세요!</p>
                    <TodayWordCardContainer><TodayWordCard style={{ margin: '0 0 0 50px'}}/></TodayWordCardContainer>
                </TodayWordContainer>

                <QuizContainer>
                    <p style={{ color: '#ff5e00' }}><b>MINI TEST</b></p>
                    <h2>나의 MZ력은 몇 점?</h2>
                    <p>유행어 퀴즈를 통해 쉽고 재미있게 유행어를 학습하세요!</p>
                </QuizContainer>

                <SubscribeContainer>
                    <h2>트렌드에 한발짝 가까워지세요</h2>
                    <p>매일 업데이트되는 새로운 유행어 알림을 받아보세요.</p>
                </SubscribeContainer>

                <MemberContainer></MemberContainer>

                <ContactContainer></ContactContainer>

            </RandingContainer>
        </PageWrapper>
    )
}

export default Main;


/*
네비게이션 바 (상단 변경? 은 에바) 는 빼자 그냥 메인 로고 버튼만
프로젝트 소개 (한 줄 소개(대시보드 링크 버튼), 대시보드, 단어, 퀴즈)
불러온 데이터 양
이메일 구독 서비스
팀원 소개
두쫀쿠 contact
*/