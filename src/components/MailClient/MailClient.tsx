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

export const MailClient: React.FC = () => {
  const { url } = useRouteMatch();
  const mailboxSections = useAppSelector((state) => state.mailbox);
  const dispatch = useAppDispatch();

  const [newSectionName, setNewSectionName] = React.useState<string>("");

  const [isSectionNameInputOpen, setSectionNameInputOpen] =
    React.useState<boolean>(false);

  function openSectionNameInput(): void {
    setSectionNameInputOpen(true);
  }

  function addNewSection(): void {
    const { customSections } = mailboxSections;
    const nonUniqueSection = customSections.find(
      (section: MailboxSection) => section.name === newSectionName
    );
    if (nonUniqueSection) {
      return console.error(`Section called ${newSectionName} already exists!`);
    }
    if (!newSectionName) return console.error(`No empty section name allowed!`);
    dispatch(mailboxActions.addSection({ name: newSectionName }));
    setNewSectionName("");
    setSectionNameInputOpen(false);
  }

  return (
    <MailClientContainer>
      <Drawer>
        {Object.values(mailboxSections).map(
          (section: MailboxSection) =>
            !Array.isArray(section) && (
              <Link key={section.id} to={`${url}/${section.slug}`}>
                <MenuTab>{section.name}</MenuTab>
              </Link>
            )
        )}
        <hr />
        <ServiceButton onClick={openSectionNameInput}>+ создать</ServiceButton>
        {isSectionNameInputOpen && (
          <SectionNameInputContainer>
            <ServiceInput
              type="text"
              placeholder="Type new section name"
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
            />
            <ServiceButton onClick={addNewSection}>
              <BsCheck2 />
            </ServiceButton>
          </SectionNameInputContainer>
        )}
        {mailboxSections.customSections.map((section: MailboxSection) => (
          <CustomSectionMenuTab key={section.id} section={section} />
        ))}
      </Drawer>
      <Client>
        <MailClientRoutes />
      </Client>
    </MailClientContainer>
  );
};

const SectionNameInputContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: stretch;
  overflow: hidden;
  button {
    width: 30%;
  }
  input {
    width: 70%;
    margin-right: 1rem;
  }
`;

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
