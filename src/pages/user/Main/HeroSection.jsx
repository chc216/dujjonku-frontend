import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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

const HeroTextContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const HeroBadge = styled.span`
    font-size: 1.1rem;
    font-weight: bold;
    color: #2B6C00;
    margin-bottom: 20px;
`;

const HeroTitle = styled.h1`
    font-size: 3rem;
    font-weight: 1000;
    line-height: 1.3;
    color: #1B1C1C;
    margin: 0 0 20px 0;
`;

const HeroDescription = styled.p`
    font-size: 1.2rem;
    color: #3F4A36;
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
    background-color: #58CC02;
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
    height: 200px;
    transition: transform 0.2s, box-shadow 0.2s;
    border: 1px solid #BECBB1;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
    cursor: pointer;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 5px 5px 15px #ebe6e6;
        border-color: #2B6C00;
    }

    .top-badge {
        display: inline-block;
        background-color: #EFEDED;
        color: #2B6C00;
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
        color: #1B1C1C;
        margin-bottom: 8px;
    }

    .desc {
        font-size: 0.9rem;
        color: #666;
        line-height: 1.4;
        max-height: 2.8rem; /* line-height 2줄 */
        overflow: hidden;
    }
`;

function HeroSection({ heroWords }) {
    const navigate = useNavigate();

    const truncateText = (text, maxLength) => {
        if (!text) return "";
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };

    return (
        <HeroSectionWrapper>
            <HeroTextContent>
                <HeroBadge>소통을 위한 가이드 <b>두쫀쿠</b></HeroBadge>
                <HeroTitle>
                    따라가기 벅찬 요즘 유행어,<br />한 눈에 쉽게
                </HeroTitle>
                <HeroDescription>
                    실시간 트렌드부터 정확한 뜻과 예문까지!<br />
                    세대 간의 언어 장벽을 허물고 소통을 시작해 보세요.
                </HeroDescription>
                <LinkButton onClick={() => navigate('/dashboard')}>무료로 시작하기</LinkButton>
            </HeroTextContent>

            <HeroCardGrid>
                {heroWords.map((card, idx) => (
                    <MiniTrendCard key={idx} onClick={() => navigate(`/report/${card.id}`)}>
                        <div>
                            <div className="top-badge">TOP {idx+1}</div>
                            <div className="word">{card.keyword}</div>
                            <div className="desc">{truncateText(card.description, 40)}</div>
                        </div>
                    </MiniTrendCard>
                ))}
            </HeroCardGrid>
        </HeroSectionWrapper>
    );
}

export default HeroSection;