import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    display: flex;
    padding: 12px 32px;
    justify-content: center;
    align-items: center;
    border-radius: 12px;

    white-space: nowrap;

    background: ${(props) => (props.$isActived ? "#2B6C00" : '#E2E2E2')};
    
    color : ${(props) => (props.$isActived ? "#FFFFFF" : '#3F4A36')};

    border: none;
    opacity: ${(props) => (props.$isActived ? 1 : '0.5')};
    cursor: pointer;

    font-family: Lexend, sans-serif;
    font-size: 16px;
    font-weight: 400;
`;
function ActionButton({text, isActived, onClick}) {
    return (
        <StyledButton $isActived={isActived} onClick={onClick}>
            {text}
        </StyledButton>
    );
}

export default ActionButton;