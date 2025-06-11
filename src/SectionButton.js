import styled from "styled-components";

const SectionButton = styled.button`
  background: ${({ theme }) => theme.button.default};
  color: ${({ theme }) => theme.button.text};
  border: none;
  border-radius: 1.5rem;
  padding: 1rem 2rem;
  margin: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: 
    background 0.3s, 
    transform 0.2s,
    box-shadow 0.2s;

  box-shadow: 0 4px 20px 0 rgba(10, 10, 35, 0.2);

  &:hover {
    background: ${({ theme }) => theme.button.hover};
    transform: translateY(-4px) scale(1.04);
    box-shadow: 0 8px 32px 0 rgba(26, 26, 46, 0.25);
  }
  &:active {
    background: ${({ theme }) => theme.button.active};
    transform: scale(0.98);
  }
`;

export default SectionButton;