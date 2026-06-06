import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #FBF9F8;
`;

const FormBox = styled.form`
    background: white;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 320px;
`;

const Input = styled.input`
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    outline: none;

    &:focus {
        border-color: #2B6C00;
    }
`;

const Button = styled.button`
    padding: 12px;
    background: #2B6C00;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 8px;
`;

function AdminLogin() {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();//새로고침 방지

        try {
            const response = await fetch("http://localhost:8080/admin/login", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({loginId: id, password: password})
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                if (token) {
                    localStorage.setItem("jwtToken", token);
                }
                alert("관리자 인증 성공");
                navigate('/admin');//바로 관리자 페이지로 이동
            } else {
                alert("아이디 또는 비밀번호가 일치하지 않습니다.")
            }
        } catch (error) {
            console.error("로그인 에러", error);
            alert("서버 오류 발생");
        }
    };

    return (
        <Container>
            <FormBox onSubmit={handleLogin}>
                <h2 style={{textAlign: 'center', color: '#2B6C00', margin: '0 0 10px 0'}}>Admin</h2>
                <Input type="text" placeholder="관리자 아이디" value={id} onChange={e=>setId(e.target.value)} required />
                <Input type="password" placeholder="관리자 비밀번호" value={password} onChange={e=>setPassword(e.target.value)} required />
                <Button type="submit">로그인</Button>
            </FormBox>
        </Container>
    )
}

export default AdminLogin;