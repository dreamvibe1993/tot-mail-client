import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Letter } from "../../components/Letter/Letter";
import { MailBox } from "../../components/MailBox/MailBox";
import { MailboxSections } from "../../models/types/enums/mailboxes";

export const MailClientRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/incoming`} exact={true}>
        <MailBox sectionType={MailboxSections.incoming} />
      </Route>
      <Route path={`${path}/sent`} exact={true}>
        <MailBox sectionType={MailboxSections.sent} />
      </Route>
      <Route path={`${path}/deleted`} exact={true}>
        <MailBox sectionType={MailboxSections.deleted} />
      </Route>
      <Route path={`${path}/drafts`} exact={true}>
        <MailBox sectionType={MailboxSections.drafts} />
      </Route>
      <Route path={`${path}/spam`} exact={true}>
        <MailBox sectionType={MailboxSections.spam} />
      </Route>
      <Route path={`${path}/:customSectionId`} exact={true}>
        <MailBox sectionType={MailboxSections.custom} />
      </Route>

      <Route path={`${path}/incoming/:id`} exact={true}>
        <Letter sectionType={MailboxSections.incoming} />
      </Route>
      <Route path={`${path}/sent/:id`} exact={true}>
        <Letter sectionType={MailboxSections.sent} />
      </Route>
      <Route path={`${path}/deleted/:id`} exact={true}>
        <Letter sectionType={MailboxSections.deleted} />
      </Route>
      <Route path={`${path}/drafts/:id`} exact={true}>
        <Letter sectionType={MailboxSections.drafts} />
      </Route>
      <Route path={`${path}/spam/:id`} exact={true}>
        <Letter sectionType={MailboxSections.spam} />
      </Route>
      <Route path={`${path}/:customSectionId/:id`} exact={true}>
        <Letter sectionType={MailboxSections.custom} />
      </Route>
    </Switch>
  );
};
