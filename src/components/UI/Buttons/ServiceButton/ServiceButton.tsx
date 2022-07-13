import styled from "styled-components";

export const ServiceButton = styled.button`
  transition: all 0.2s ease;
  cursor: pointer;
  font-size: 1.6rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: none;
  font-weight: 600;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
