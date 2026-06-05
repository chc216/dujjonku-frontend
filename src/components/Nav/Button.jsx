import styled from "styled-components";

const Container = styled.button`
  display: flex;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
  align-self: stretch;
  border-radius: 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  &:hover {
    /* border-bottom: 4px solid #2B6C00; */
    background: #58cc02;
  }
`;

const Text = styled.span`
  color: #3f4a36;
  font-family: Lexend;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.28px;
`;

function Button({ Icon, text, onClick }) {
  return (
    <Container onClick={onClick}>
      <Icon style={{ width: "15px", height: "15px", fill: "#3F4A36" }} />
      <Text>{text}</Text>
    </Container>
  );
}

export default Button;
