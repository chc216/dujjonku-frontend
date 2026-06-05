import styled from "styled-components";
import Button from "./Button";
import DashboardIcon from "@/assets/dashboard.svg?react";
import QuizIcon from "@/assets/quiz_icon.svg?react";
import { useNavigate } from "react-router-dom";
import SubscribeModal from "@/components/SubscribeModal";
import React, { useState } from "react";
import SubscribeIcon from "@/assets/subscribe.svg?react";

const NavBarContainer = styled.div`
  box-sizing: border-box; //구독알림 서비스 네베게이션바에서 안보여서 추가함.
  position: sticky;
  top: 0;
  display: flex;
  width: 24vw;
  height: 100vh;
  padding: 5vh 0;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border-right: 4px solid #becbb1;
  background: #f5f3f3;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  min-width: 200px;
  max-width: 350px;
  flex-shrink: 0;
`;

const LogoContainer = styled.div`
  display: flex;
  padding-bottom: 4vh;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
`;

const LogoContent = styled.div`
  display: flex;
  padding: 0 10%;
  flex-direction: column;
  align-items: center;
  color: #2b6c00;
  text-align: center;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 2.4rem;
  font-style: normal;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: 6px;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  padding: 0 8px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
  align-self: stretch;
`;

const SubscribeContainer = styled.div`
  display: flex;
  padding: 0 10%;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;

function NavBar() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <NavBarContainer>
      <LogoContainer>
        <LogoContent onClick={() => navigate("/")}>Dujjonku</LogoContent>
      </LogoContainer>
      <ButtonContainer>
        <Button
          Icon={DashboardIcon}
          text={"대시보드"}
          onClick={() => navigate("/")}
        />
        <Button
          Icon={QuizIcon}
          text={"퀴즈"}
          onClick={() => navigate("/quiz")}
        />
      </ButtonContainer>
      <SubscribeContainer>
        <Button
          Icon={SubscribeIcon}
          text="매일 유행어 구독하기"
          onClick={() => setIsModalOpen(true)}
        />
      </SubscribeContainer>
      {isModalOpen && <SubscribeModal onClose={() => setIsModalOpen(false)} />}
    </NavBarContainer>
  );
}

export default NavBar;
