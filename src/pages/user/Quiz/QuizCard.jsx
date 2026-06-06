import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import NavBar from "@/components/Nav/NavBar";

import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";
import OptionList from "./OptionList";
import AnswerCard from "./AnswerCard";
import ActionButton from "./ActionButton";

const LandingOptionWrapper = styled.div`
    width: 100%;

    && p {
        position: relative !important;
        top: 3px !important;
        margin: 0 !important; 
    }
`;

const QuizContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 30px;
`

function QuizCard() {
    const [quizzes, setQuizzes] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        
        const [currentIndex, setCurrentIndex] = useState(0); //현재 퀴즈문제 인덱스(json의 객체 인덱스)
        const [selectedOption, setSelectedOption] = useState(null); //사용자가 선택한 옵션(1,2,3,4)
        const [isSubmit, setSubmit] = useState(false);//제출하기 버튼 클릭 전/후 유무(로직이 다름)
    
        useEffect(() => {
            const fetchQuizzes = async () => {
                try {
                    const response = await fetch("http://localhost:8080/quizzes?limit=10");
                    const data = await response.json();
                    setQuizzes(data);
                    setIsLoading(false);
                } catch (error) {
                    console.error("퀴즈를 불러오는데 실패했습니다.", error);
                    setIsLoading(false);
                }
            }
            fetchQuizzes();
        }, []);
    
        if (isLoading) {
            return (
                <>
                    <h3>퀴즈를 불러오는 중입니다...</h3>
                </>
            );
        }
    
        const totalQuestionNum = quizzes.length;//전체 문제 개수
        const currentQuestion = quizzes[currentIndex];//현재 문제인 객체를 담고 있는 변수
    
        const progressPercent = Math.floor((currentIndex+1)/(totalQuestionNum) * 100);
        const isCorrect = selectedOption === currentQuestion.answerNum;
        const isLastQuestion = (currentIndex + 1) === totalQuestionNum;
    
        const optionsArray = currentQuestion.options;
        
        //옵션 선택 핸들러(이미 제출했으면-> selectedOption상태 변화X & 제출X -> selectedOption상태변화)
        const handleSelect = (selectNumber) => {
            if(isSubmit) {
                return;
            }
            else {
                setSelectedOption(selectNumber);
            }
        };
    
        //답안 제출 해들러(hanleSelect가 미리 선행되어 옵션 선택이 이루어졌으면 -> true로 변경, 옵션선택X -> 정답 선택 유도 alert창
        const handleSubmit = () => {
            if(selectedOption === null) {
                alert("정답을 선택해주세요!");
                return;
            }
            else {
                setSubmit(true);
            }
        };
    
        const handleNext = () => {
            if (!isLastQuestion) {
                setCurrentIndex(currentIndex + 1);
                setSelectedOption(null);
                setSubmit(false);
            } else {
                alert("모든 퀴즈 풀이를 완료했습니다!");
            }
        };
    return (
        <QuizContainer>
            <QuestionCard question={currentQuestion.question} />
            <LandingOptionWrapper>
                <OptionList
                    options={optionsArray}
                    selectedOption={selectedOption}
                    handleSelect={handleSelect}
                />
            </LandingOptionWrapper> 
        </QuizContainer>
    );
}

export default QuizCard;