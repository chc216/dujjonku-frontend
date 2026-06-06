import React, {useState} from 'react';
import styled from 'styled-components'

const CardContainer = styled.div`
  background: white;
  padding: 40px;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  border: 1px solid #f0f0f0;
`;
const Title = styled.h2`
    text-align: center;
    color: #2B6C00;
    margin-bottom: 24px;
    font-size: 22px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  
  label { 
    font-weight: bold; 
    margin-bottom: 8px; 
    color: #333; 
  }
  input { 
    padding: 14px; 
    border: 1px solid #ccc; 
    border-radius: 8px;
    font-size: 16px;
    outline: none;

    &:focus {
        border-color: #2B6C00;
    }
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  
  input { margin-right: 8px; cursor: pointer; }
  label { color: #555; font-size: 14px; cursor: pointer}
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #58CC02;
  color: white;
  border: none; 
  border-radius: 8px; 
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    opacity: 0.8;
  }
`;

function SubscribeCard({}) {
    const [email, setEmail] = useState('');
    const [consent, setConsent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!email) {
            alert('이메일을 입력해주세요.');
            return;
        }
        if(!consent) {
            alert('개인정보 수집 및 이용에 동의해주세요.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/subscriptions', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    consent: consent
                }),
            });
            
            if (response.ok) {
                alert('구독이 완료되었습니다.');
                setEmail('');
                setConsent(false);
            }else {
                alert('구독에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('api error: ', error);
            alert('서버와 통신 중 오류 발생')
        }
    };

    return (
        <CardContainer>
            <form onSubmit={handleSubmit}>
                <InputContainer>
                    <label>이메일</label>
                    <input
                        type="email"
                        placeholder="예) dujjonku@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </InputContainer>

                <CheckboxContainer>
                    <input
                        type="checkbox"
                        id="consent"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                    />
                    <label htmlFor="consent">개인정보 수집 및 이용에 동의합니다.</label>
                </CheckboxContainer>
                <SubmitButton type="submit">구독하기</SubmitButton>
            </form>
        </CardContainer>
    );
}

export default SubscribeCard;