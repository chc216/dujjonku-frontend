import NavBar from "@/components/Nav/NavBar";
import React, {useState} from "react";
import styled from "styled-components";

import quiz_correct from "@/assets/quiz_correct.svg";
import quiz_progress from "@/assets/quiz_progress.svg";
import quiz_incorrect from "@/assets/quiz_incorrect.svg";

//더미 json
const MOCK_QUIZZES = [
  {
    quizId: 1,
    question: "후배가 카톡으로 '선배님, 오늘 점메추 해주세요!'라고 보냈습니다. '점메추'는 무슨 뜻일까요?",
    options: ["점점 메마르는 추억", "점심 메뉴 추천", "점잖은 메추리알", "점심 메이트 추가"],
    answerNum: 2,
    explanation: "'점메추'는 '점심 메뉴 추천'의 줄임말입니다. 직장이나 학교에서 점심시간이 다가올 때 자주 쓰는 유용한 표현이랍니다."
  },
  {
    quizId: 2,
    question: "다음 중 '중꺾마'의 올바른 뜻은 무엇일까요?",
    options: ["중요한 것은 꺾이지 않는 마음", "중간에 꺾이면 마침표", "중국집 꺾어서 마라탕", "중요한 건 꺾이는 마술"],
    answerNum: 1,
    explanation: "e스포츠에서 시작된 유행어로, 아무리 불리한 상황이라도 끝까지 포기하지 않는 굳건한 의지를 뜻합니다."
  }
];

const QuizPageContainer = styled.main`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    align-items: center;
    padding-top: 80px; /*top nav바 생기면 고쳐야 할듯*/
    margin-left: 240px; /*NavBar 왼쪽 고정된거 고려한 마진*/
    background: #FBF9F8;
`

const ProgressSection = styled.div`
    width: 920px;
    margin-bottom: 40px;

    display: flex;
    flex-direction: column;
    justify-content: center
`
const ProgressTextWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
`

const ProgressBar = styled.div`
    display: flex;
    height: 8px;
    width: 50%;
    margin-top: 16px;
    border-radius: 9999px;
    background: #E4E2E2;
`
const ProgressFillBar = styled.div`
    width: ${(props) => (props.percent)}%;
    height: 8px;
    border-radius: 9999px;
    background: #2B6C00;

    transition: width 0.3s ease-in-out;
`

const QuestionSection = styled.div`
    width: 920px;
    margin-bottom: 40px;
    padding: 60px 0;


    border-radius: 20px;
    background: #FFFFFF;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
`
//이 단어의 뜻은? 박스
const QuestionHeader = styled.div`
    display: flex;
    padding: 4px 12px;
    flex-direction: column;
    align-items: center;
    border-radius: 6px;
    border: 1px solid rgba(43, 108, 0, 0.20);
    background: rgba(43, 108, 0, 0.10);
    color: #2B6C00;
    text-align: center;
    font-family: Lexend;
    font-size: 14px;
    font-style: normal;
    font-weight: 150px;
    line-height: 20px;
`
const QuestionTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    max-width: 700px;
    padding: 0 20px;

    color: #1B1C1C;
    text-align: center;

    font-family: "Plus Jakarta Sans", sans-serif;;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.5;
    letter-spacing: -1px;
`


const OptionGridSection = styled.div`
    display: grid; 
    width: 100%; 
    max-width: 920px;
    gap: 24px; 
    grid-template-columns: repeat(2, 1fr);
`
const OptionButton = styled.button`
    width: 100%;
    min-height: 96px;

    display: flex;
    align-items: center;
    padding: 0 24px;
    gap: 16px;


    border-radius: 20px;
    background: ${(props) => (props.isSelected ? '#F0F5ED' : '#FFFFFF')};
    border: ${(props) => (props.isSelected ? '2px solid #2B6C00' : '2px solid transparent')};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);

    text-align: left;
    cursor: pointer;

    &:hover{
        background: ${(props) => (props.isSelected ? '#F0F5ED' : '#F9F9F9')};
    }
    p {
        margin: 0;
        color: #1B1C1C;
        font-family: "Plus Jakarta Sans", sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 1.5;
    }
`
const OptionCircle = styled.div`
    display: flex;
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: ${(props) => (props.isSelected ? '#2B6C00' : '#EAE8E7')};
    color: ${(props) => (props.isSelected ? '#FFFFFF' : '#3F4A36')};

    font-family: Lexend, sans-serif;
    font-size: 16px;
    font-weight: 600;
`

const SubmitSection = styled.div`
    display: flex;
    width: 100%;
    max-width: 920px;
    justify-content: right;
    margin-top: 24px;
`

const AnswerSection = styled.div`
    display: flex;
    width: 100%;
    max-width: 920px;
    margin-top: 40px;
`

const AnswerInnerSection = styled.div`
    display: flex;
    align-items : center;
    justify-content: space-between;
    width: 100%;
    padding: 32px 40px;

    border-radius: 20px;
    background: #F0F5ED;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.10);
`
const AnswerCircle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(43, 108, 0, 0.10);
    background: ${(props)=> (props.isCorrect ? 'rgba(43, 108, 0, 0.10)' : '#FF0000')};
    
`
const AnswerTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 24px;
    gap: 8px;
    h3 {
        margin: 0;
        color: #1B1C1C;
        font-size: 20px;
        font-weight: 700;
    };
    p {
        margin: 0;
        width: 100%;
        color: #3F4A36;
        font-family: "Nunito Sans", sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 1.5;
    };
`//h3 & p tag 포함

//정답 제출 버튼 & 다음 문제 버튼
const ActionButton = styled.button`
    display: flex;
    padding: 12px 32px;
    justify-content: center;
    align-items: center;
    border-radius: 12px;

    white-space: nowrap;

    background: ${(props) => (props.isActived ? "#2B6C00" : '#E2E2E2')};
    color : ${(props) => (props.isActived ? "#FFFFFF" : '#3F4A36')};

    border: none;
    opacity: ${(props) => (props.isActived ? 1 : '0.5')};
    cursor: pointer;

    font-family: Lexend, sans-serif;
    font-size: 16px;
    font-weight: 400;
`

function Quiz() {
    const [currentIndex, setCurrentIndex] = useState(0); //현재 퀴즈문제 인덱스(json의 객체 인덱스)
    const [selectedOption, setSelectedOption] = useState(null); //사용자가 선택한 옵션(1,2,3,4)
    const [isSubmit, setSubmit] = useState(false);//제출하기 버튼 클릭 전/후 유무(로직이 다름)

    const totalQuestionNum = MOCK_QUIZZES.length;//전체 문제 개수
    const currentQuestion = MOCK_QUIZZES[currentIndex];//현재 문제인 객체를 담고 있는 변수

    //옵션 선택 핸들러(이미 제출했으면-> selectedOption상태 변화X & 제출X -> selectedOption상태변화)
    const handleSelect = (selectNumber) => {
        if(isSubmit) {
            return;
        }
        else {
            setSelectedOption(selectNumber);
        }
    }
    //답안 제출 해들러(hanleSelect가 미리 선행되어 옵션 선택이 이루어졌으면 -> true로 변경, 옵션선택X -> 정답 선택 유도 alert창
    const handleSubmit = () => {
        if(selectedOption === null) {
            alert("정답을 선택해주세요!");
            return;
        }
        else {
            setSubmit(true);
        }
    }

    //다음 문제로 넘어가기 핸들러(전체문제를 아직 다 못풀었으면 -> 상태변화state업데이트, 다 풀었으면 -> alert!)
    const handleNext = () => {
        if ((currentIndex + 1) < totalQuestionNum) {
            setCurrentIndex(currentIndex + 1);
            setSelectedOption(null);
            setSubmit(false);
        }
        else {
            alert("모든 퀴즈 풀이를 완료했습니다!");
        }
    }

    const progressPercent = Math.floor((currentIndex+1)/(totalQuestionNum) * 100);

    return (
        <>
            <NavBar></NavBar>

            <QuizPageContainer>
                <ProgressSection>
                    <ProgressTextWrapper>
                        <span>{currentIndex+1}번째 문제 / 총 {totalQuestionNum}</span>
                        <span>
                            <img src={quiz_progress} alt="진행률 아이콘"/>
                            진행률 {progressPercent}%
                        </span>
                    </ProgressTextWrapper>
                    <ProgressBar>
                        <ProgressFillBar percent={progressPercent}/>
                    </ProgressBar>
                </ProgressSection>

                <QuestionSection>
                    <QuestionHeader>이 단어의 뜻은?</QuestionHeader>
                    <QuestionTextWrapper>
                        <h1>{currentQuestion.question}</h1>
                    </QuestionTextWrapper>
                </QuestionSection>

                <OptionGridSection>
                    <OptionButton
                        isSelected={selectedOption === 1}
                        onClick={() => handleSelect(1)}
                    >
                        <OptionCircle isSelected={selectedOption === 1}>1</OptionCircle>
                        <p>{currentQuestion.options[0]}</p>
                    </OptionButton>
                    <OptionButton 
                        isSelected={selectedOption === 2}
                        onClick={() => handleSelect(2)}
                    >
                        <OptionCircle isSelected={selectedOption === 2}>2</OptionCircle>
                        <p>{currentQuestion.options[1]}</p>
                    </OptionButton>
                    <OptionButton 
                        isSelected={selectedOption === 3}
                        onClick={() => handleSelect(3)}
                    >
                        <OptionCircle isSelected={selectedOption === 3}>3</OptionCircle>
                        <p>{currentQuestion.options[2]}</p>
                    </OptionButton>
                    <OptionButton 
                        isSelected={selectedOption === 4}
                        onClick={() => handleSelect(4)}
                    >
                        <OptionCircle isSelected={selectedOption === 4}>4</OptionCircle>
                        <p>{currentQuestion.options[3]}</p>
                    </OptionButton>
                </OptionGridSection>

                {!isSubmit ? (
                    /*정답 제출 전 상태*/
                    <SubmitSection>
                        <ActionButton
                            isActived={selectedOption !== null}
                            onClick={handleSubmit}
                        >정답 제출
                        </ActionButton>
                    </SubmitSection>
                    ) : ( 
                    /*정답 제출 후 상태*/
                    <AnswerSection>
                        <AnswerInnerSection>
                            <AnswerCircle isCorrect={selectedOption === currentQuestion.answerNum}>
                                <img src={currentQuestion.answerNum === selectedOption ? quiz_correct : quiz_incorrect}
                                    alt={currentQuestion.answerNum === selectedOption ? "정답 아이콘" : "오답 아이콘"}
                                />
                            </AnswerCircle>
                            <AnswerTextWrapper>
                                <h3>{currentQuestion.answerNum === selectedOption ? "정답입니다!" : "오답입니다!"}</h3>
                                <p>{currentQuestion.explanation}</p>
                            </AnswerTextWrapper>
                            <ActionButton
                                isActived={selectedOption !== null}
                                onClick={handleNext}
                            >
                                {(currentIndex + 1) === totalQuestionNum ? "수고하셨습니다" : "다음 문제"}
                            </ActionButton>
                        </AnswerInnerSection>
                    </AnswerSection>
                    )
                }

            </QuizPageContainer>

        </>);
}

export default Quiz;