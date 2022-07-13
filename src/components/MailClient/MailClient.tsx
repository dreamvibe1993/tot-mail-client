import React from "react";
import styled from "styled-components";
import { useRouteMatch } from "react-router";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { ServiceButton } from "../UI/Buttons/ServiceButton/ServiceButton";
import { ServiceInput } from "../UI/Inputs/ServiceInput";
import { mailboxActions } from "../../redux/reducers/mailbox/mailboxSlice";
import { MailClientRoutes } from "../../configs/routes/mail-client-routes";
import { BsThreeDotsVertical, BsCheck2 } from "react-icons/bs";
import { CursorWrap } from "../UI/Wraps/CursorWrap";
import { OptionsDropdown } from "../UI/Dropdowns/OptionsDropdown";
import { MenuTab } from "../UI/Tabs/MenuTab";
import { CustomSectionMenuTab } from "../UI/Tabs/CustomSectionMenuTab/CustomSectionMenuTab";
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
  height: 100%;
  border: 1px solid gray;
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const MailClientContainer = styled.div`
  display: grid;
  grid-template: "drwr scrn" "drwr scrn" / 20% 80%;
  width: 100%;
  height: 100vh;
  padding: 2rem;
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
