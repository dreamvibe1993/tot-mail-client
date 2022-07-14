import React from "react";
import styled from "styled-components";

import { MailClientRoutes } from "../../configs/routes/mail-client-routes";
import { DrawerMenu } from "../DrawerMenu/DrawerMenu";

export const MailClient: React.FC = () => {
  return (
    <MailClientContainer>
      <Drawer>
        <DrawerMenu />
      </Drawer>
      <Client>
        <MailClientRoutes />
      </Client>
    </MailClientContainer>
  );
};

const Client = styled.div`
  grid-area: scrn;
  width: 100%;
  border: 1px solid gray;
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const MailClientContainer = styled.div`
  display: grid;
  grid-template: "drwr scrn" 100% "drwr scrn" / 20% 80%;
  width: 100%;
  padding: 2rem;
  height: 100vh;
`;

const Drawer = styled.div`
  grid-area: drwr;
  display: flex;
  flex-direction: column;
  padding-right: 2rem;
  & > * {
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`;
