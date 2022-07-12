import React from "react";
import styled from "styled-components";
import { Route, Switch, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";

import { MailBox } from "../MailBox/MailBox";
import { Letter } from "../Letter/Letter";
import { Mailboxes } from "../../models/types/enums/mailboxes";

export const MailClient: React.FC = () => {
  const { path, url } = useRouteMatch();
  
  return (
    <MailClientContainer>
      <Drawer>
        <Link to={`${url}/incoming`}>
          <Tab>ВХОДЯЩИЕ</Tab>
        </Link>
        <Link to={`${url}/sent`}>
          <Tab>ОТПРАВЛЕННЫЕ</Tab>
        </Link>
        <Link to={`${url}/drafts`}>
          <Tab>ЧЕРНОВИКИ</Tab>
        </Link>
        <Link to={`${url}/deleted`}>
          <Tab>УДАЛЕННЫЕ</Tab>
        </Link>
        <Link to={`${url}/spam`}>
          <Tab>СПАМ</Tab>
        </Link>
      </Drawer>
      <Client>
        <Switch>
          <Route path={`${path}/incoming`} exact={true}>
            <MailBox type={Mailboxes.incoming} />
          </Route>
          <Route path={`${path}/sent`} exact={true}>
            <MailBox type={Mailboxes.sent} />
          </Route>
          <Route path={`${path}/deleted`} exact={true}>
            <MailBox type={Mailboxes.deleted} />
          </Route>
          <Route path={`${path}/drafts`} exact={true}>
            <MailBox type={Mailboxes.drafts} />
          </Route>
          <Route path={`${path}/spam`} exact={true}>
            <MailBox type={Mailboxes.spam} />
          </Route>
          <Route path={`${path}/incoming/:id`} exact={true}>
            <Letter />
          </Route>
        </Switch>
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

const Tab = styled.div`
  padding: 1rem;
  border: 1px solid gray;
  border-radius: 15px 0px 0px 15px;
  font-size: 1.6rem;
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
