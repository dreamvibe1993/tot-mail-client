import styled from "styled-components";

interface Props {
  open: boolean;
}

export const MenuTab: any = styled.div<Props>`
  transition: transform 0.1s ease;
  padding: 1rem;
  border: 1px solid gray;
  border-radius: ${(p) => p.open ? `15px 0px 0px 15px` : "0"};
  font-size: 1.6rem;
  background-color: white;
  transform: ${(p) => p.open && `translateX(2.1rem)`};
  border-right: ${(p) => p.open && `none`};
  @media (max-width: 425px) {
    transform: none;
    border-right: 1px solid gray;
    border-radius: 0rem;
  }
`;
