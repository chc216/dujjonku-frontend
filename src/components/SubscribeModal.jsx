import React, {useState} from 'react';
import styled from 'styled-components'

const ModalContentContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 400px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  margin-top: 20px;
  
  label { font-weight: bold; margin-bottom: 8px; }
  input { padding: 10px; border: 1px solid #ccc; border-radius: 4px; }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  
  input { margin-right: 8px; }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const CancleButton = styled.button`
  padding: 10px 16px;
  background: #f1f3f5;
  border: none; border-radius: 6px; cursor: pointer;
`;

const SubmitButton = styled.button`
  padding: 10px 16px;
  background: #58CC02;
  color: white;
  border: none; border-radius: 6px; cursor: pointer;
`;

function SubscribeModal({onClose}) {
    const [email, setEmail] = useState('');
    const [consent, setConsent] = useState(false);

    const handleSubmit = async (e) => {
        
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
                onClose();
            }else {
                alert('구독에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('api error: ', error);
            alert('서버와 통신 중 오류 발생')
        }
    };

    return (
        <ModalContentContainer>
            <h2>오늘의 유행어 구독하기</h2>
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

                <ButtonContainer>
                    <CancleButton type="button" onClick={onClose}>취소</CancleButton>
                    <SubmitButton type="submit">구독하기</SubmitButton>
                </ButtonContainer>
            </form>
        </ModalContentContainer>
    );
}

export default SubscribeModal;