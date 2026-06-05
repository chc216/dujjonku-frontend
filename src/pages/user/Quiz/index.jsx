import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import NavBar from "@/components/Nav/NavBar";

import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";
import OptionList from "./OptionList";
import AnswerCard from "./AnswerCard";
import ActionButton from "./ActionButton";


const QuizPageContainer = styled.main`
    flex: 1;
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    align-items: center;
    padding-top: 80px; /*top nav바 생기면 고쳐야 할듯*/
    margin-left: 240px; /*NavBar 왼쪽 고정된거 고려한 마진*/
    background: #FBF9F8;
`;
const SubmitSection = styled.div`
    display: flex;
    width: 100%;
    max-width: 920px;
    justify-content: right;
    margin-top: 24px;
`;

function Quiz() {
    
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
        <>
            <NavBar></NavBar>
            <QuizPageContainer>
                <ProgressBar 
                    currentIndex={currentIndex}
                    totalQuestionNum={totalQuestionNum}
                    progressPercent={progressPercent}
                />

                <QuestionCard question={currentQuestion.question} />

                <OptionList
                    options={optionsArray}
                    selectedOption={selectedOption}
                    handleSelect={handleSelect}
                />

                {!isSubmit ? (
                    <SubmitSection>
                        <ActionButton
                            text="정답 제출"
                            isActived={selectedOption !== null}
                            onClick={handleSubmit}
                        />
                    </SubmitSection>
                ) : (
                    <AnswerCard
                        isCorrect={isCorrect}
                        explanation={currentQuestion.explanation}
                        isLastQuestion={isLastQuestion}
                        handleNext={handleNext}
                    />
                )}
            </QuizPageContainer>
        </>
    );

}

export default Quiz;