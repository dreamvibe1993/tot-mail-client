import React from "react";
import styled from "styled-components";

import { MailClientRoutes } from "../../configs/routes/mail-client-routes";
import { DrawerMenu } from "../DrawerMenu/DrawerMenu";
import { GiHamburgerMenu } from "react-icons/gi";
import { ServiceButton } from "../UI/Buttons/ServiceButton/ServiceButton";

export const MailClient: React.FC = () => {
  const [isDrawerShow, setDrawerShow] = React.useState<boolean>(false);

  function showDrawer() {
    setDrawerShow(true);
  }

  function closeDrawer() {
    setDrawerShow(false);
  }

  return (
    <>
      <Header>
        <ServiceButton onClick={showDrawer}>
          <GiHamburgerMenu />
        </ServiceButton>
      </Header>
      <MailClientContainer>
        <OpaqueScreen
          isShow={isDrawerShow}
          onClick={closeDrawer}
        ></OpaqueScreen>
        <Drawer isShow={isDrawerShow}>
          <DrawerMenu />
        </Drawer>
        <Client>
          <MailClientRoutes />
        </Client>
      </MailClientContainer>
    </>
  );
};

interface DrawerProps {
  isShow: boolean;
}

const OpaqueScreen = styled.div<DrawerProps>`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  display: none;
  transition: opacity 0.5s ease;
  opacity: ${(p) => (p.isShow ? "1" : "0")};
  @media (max-width: 425px) {
    display: block;
    pointer-events: ${(p) => (p.isShow ? "all" : "none")};
  }
`;

const Header = styled.div`
  display: none;
  z-index: 11;
  @media (max-width: 425px) {
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: row-reverse;
    padding: 1rem;
    height: 5.5rem;
    width: 100%;
    background-color: #ececec;
  }
`;

const Client = styled.div`
  grid-area: scrn;
  width: 100%;
  border: 1px solid gray;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  overflow-y: auto;
  @media (max-width: 425px) {
    padding: 1rem;
  }
`;

const MailClientContainer = styled.div`
  display: grid;
  grid-template: "drwr scrn" 100% "drwr scrn" / 20% 80%;
  width: 100%;
  padding: 2rem;
  height: 100vh;
  @media (max-width: 425px) {
    grid-template: "scrn" 100% "scrn" / 100%;
    padding: 1rem;

  }
`;

const Drawer = styled.div<DrawerProps>`
  grid-area: drwr;
  display: flex;
  flex-direction: column;
  padding-right: 2rem;
  & > * {
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
  @media (max-width: 425px) {
    position: fixed;
    top: 5.5rem;
    left: 0;
    background-color: white;
    height: 100%;
    width: 75%;
    padding: 1rem;
    transition: transform 0.5s ease;
    transform: translateX(${(p) => (p.isShow ? "0" : "-100%")});
    z-index: 11;
  }
`;
