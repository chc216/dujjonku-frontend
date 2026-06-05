import React from 'react';
import styled from 'styled-components';

const OptionGridSection = styled.div`
    display: grid; 
    width: 100%; 
    max-width: 920px;
    gap: 24px; 
    grid-template-columns: repeat(2, 1fr);
`;

const OptionButton = styled.button`
    width: 100%;
    min-height: 96px;

    display: flex;
    align-items: center;
    padding: 0 24px;
    gap: 16px;


    border-radius: 20px;
    background: ${(props) => (props.$isSelected ? '#F0F5ED' : '#FFFFFF')};
    border: ${(props) => (props.$isSelected ? '2px solid #2B6C00' : '2px solid transparent')};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);

    text-align: left;
    cursor: pointer;

    &:hover{
        background: ${(props) => (props.$isSelected ? '#F0F5ED' : '#F9F9F9')};
    }
    p {
        margin: 0;
        color: #1B1C1C;
        font-family: "Plus Jakarta Sans", sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 1.5;
    }
`;

const OptionCircle = styled.div`
    display: flex;
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: ${(props) => (props.$isSelected ? '#2B6C00' : '#EAE8E7')};
    color: ${(props) => (props.$isSelected ? '#FFFFFF' : '#3F4A36')};

    font-family: Lexend, sans-serif;
    font-size: 16px;
    font-weight: 600;
`;

function OptionList({options, selectedOption, handleSelect}) {
    return (
            <OptionGridSection>
                {options.map((optionText, index) => {
                    const optionNumber = index + 1;
                    const isSelected = selectedOption === optionNumber;

                    return (
                        <OptionButton
                            key={optionNumber}
                            $isSelected={isSelected}
                            onClick={() => handleSelect(optionNumber)}
                        >
                            <OptionCircle $isSelected={isSelected}>{optionNumber}</OptionCircle>
                            <p>{optionText}</p>
                        </OptionButton>
                    );
                })}
            </OptionGridSection>

    );
}

export default OptionList;