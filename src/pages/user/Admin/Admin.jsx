import React, { useState, useEffect } from "react";
import styled from "styled-components";

const AdminContainer = styled.div`
    padding: 40px;
    background: #FBF9F8;
    min-height: 100vh;
    font-family: "Plus Jakarta Sans", sans-serif;

`;

const Title = styled.h1`
    color: #2B6C00;
    margin-bottom: 20px
`;

const Section = styled.div`
    background: white;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    margin-bottom: 30px;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 16px;

    input, textarea, select {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-family: inherit;
    }
`;
//$danger활용해서 삭제버튼만 빨간색으로
const Button = styled.button`
    padding: 10px 20px;
    background: ${(props)=> props.$danger ? "#FF4D4D" : "#2B6C00"};
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;

    &:hover {
        opacity: 0.8;
    }
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;

    th, td {
        padding: 12px;
        border-bottom: 1px solid #eee;
        text-align: left;
    }
    th {
        background: #F0F5ED;
        color: #2B6C00;
    }
`

const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 20px;
`;

const PageButton = styled.button`
    padding: 8px 12px;
    border: 1px solid #BECBB1;
    background: ${(props) => (props.$active ? '#2B6C00' : 'white')};
    color: ${(props) => (props.$active ? 'white' : '#2B6C00')};
    border-radius: 6px;
    cursor: pointer;

    &:disabled {
        background: #f1f3f5;
        color: #adb5bd;
        cursor: not-allowed;
        border: 1px solid #e9ecef;
    }
`;


function AdminQuizPage() {
    //로컬스토리지에서 jwtToken이름으로 저장해둔 토큰 꺼내오기
    const getToken = () => localStorage.getItem("jwtToken");

    const [quizzes, setQuizzes] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [formData, setFormData] = useState({
        question: '', answerNum: 1, option1: '', option2: '', option3: '', option4: '', explanation: ''
    });

    //async, await로 이벤트기반 비동기 처리
    const fetchQuizzes = async () => {
        try {
            const response = await fetch(`http://localhost:8080/admin/quizzes?page=${currentPage - 1}&size=10`, {
                headers: {"Authorization": `Bearer ${getToken()}`}
            });
            const data = await response.json();

            console.log("백엔드 응답 데이터:", data);

            setQuizzes(data.quizzes);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("조회 실패");
        }
    };
    
    //currentPage변경될 때 마다, 패치 시행
    useEffect(() => {
        fetchQuizzes();
    }, [currentPage]);

    const handleInput =  (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));//...prev로 기존의 다른 fromData 요소들 변경안되게 막아주기
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/admin/quizzes", {
                method: "POST",
                headers: {"Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`
                },
                body: JSON.stringify({
                    wordId: 1,
                    question: formData.question,
                    answerNum: Number(formData.answerNum),
                    option1: formData.option1,
                    option2: formData.option2,
                    option3: formData.option3,
                    option4: formData.option4,
                    explanation: formData.explanation
                })
            });

            if (response.ok) {
                alert("퀴즈가 성공적으로 등록되었습니다.");
                fetchQuizzes();
                setCurrentPage(1);
                setFormData({
                    question: '', answerNum: 1, option1: '', option2: '', option3: '', option4: '', explanation: ''
                });
            }
        } catch (error) {
            console.error("등록 에러", error);
        }
    };

    const handleDelete = async (quizId) => {
        if(!window.confirm("정말 이 퀴즈를 삭제하시겠습니까?")) { 
            return ;
        }
        try {
            const response = await fetch(`http://localhost:8080/admin/quizzes/${quizId}`,{
                method: "DELETE",
                headers: { "Authorization": `Bearer ${getToken()}`}
            });
            if (response.ok) {
                alert("삭제되었습니다.");
                fetchQuizzes();
            }
        } catch (error) {
            console.error("삭제 에러", error);
        }
    };

    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <=totalPages; i++) {
            pages.push(
                <PageButton key={i} $active={currentPage === i} onClick={() => setCurrentPage(i)}>
                    {i}
                </PageButton>
            );
        }
        return pages;
    }


    return (
        <AdminContainer>
            <Title>관리자 페이지</Title>

            <Section>
                <h3>새 퀴즈 등록</h3>
                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <input type="text" name="question" placeholder="퀴즈 질문을 입력하세요." value={formData.question} onChange={handleInput} required />

                        <div style={{display: 'flex', gap: '10px'}}>
                            <input type="text" name="option1" placeholder="보기1" value={formData.option1} onChange={handleInput} required style={{flex: 1}}/>
                            <input type="text" name="option2" placeholder="보기2" value={formData.option2} onChange={handleInput} required style={{flex: 1}}/>
                            <input type="text" name="option3" placeholder="보기3" value={formData.option3} onChange={handleInput} required style={{flex: 1}}/>
                            <input type="text" name="option4" placeholder="보기4" value={formData.option4} onChange={handleInput} required style={{flex: 1}}/>
                        </div>

                        <select name="answerNum" value={formData.answerNum} onChange={handleInput}>
                            <option value={1}>정답 번호: 1번</option>
                            <option value={2}>정답 번호: 2번</option>
                            <option value={3}>정답 번호: 3번</option>
                            <option value={4}>정답 번호: 4번</option>
                        </select>

                        <textarea name="explanation" placeholder="정답 해설을 입력하세요" value={formData.explanation} onChange={handleInput} required rows={3}></textarea>
                    </FormGroup>
                    <Button type="submit">퀴즈 등록하기</Button>
                </form>
            </Section>

            <Section>
                <h3>등록된 퀴즈 목록</h3>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>질문</th>
                            <th>정답</th>
                            <th>작성일</th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quizzes && quizzes.map((quiz) => (
                            <tr key={quiz.quizId}>
                                <td>{quiz.quizId}</td>
                                <td>{quiz.question}</td>
                                <td>{quiz.answerNum}</td>
                                <td>{new Date(quiz.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <Button $danger={true} type="button" onClick={() => handleDelete(quiz.quizId)}>삭제</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <PaginationWrapper>
                    <PageButton disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
                        이전
                    </PageButton>

                    {renderPagination()}

                    <PageButton disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>
                        다음
                    </PageButton>
                </PaginationWrapper>
            </Section>

        </AdminContainer>
    );



}

export default AdminQuizPage;