import React from "react";
import styled from "styled-components";
import { useRouteMatch, Link, useLocation } from "react-router-dom";

import { BsCheck2 } from "react-icons/bs";

import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { ServiceButton } from "../UI/Buttons/ServiceButton/ServiceButton";
import { ServiceInput } from "../UI/Inputs/ServiceInput";
import { CustomSectionMenuTab } from "../UI/Tabs/CustomSectionMenuTab/CustomSectionMenuTab";
import { mailboxActions } from "../../redux/reducers/mailbox/mailboxSlice";
import { MenuTab } from "../UI/Tabs/MenuTab";
import { SpanWithOverflow } from "../UI/Spans/SpanWithOverflow";

export const DrawerMenu = () => {
  const { url } = useRouteMatch();
  const location = useLocation();
  const mailboxSections = useAppSelector((state) => state.mailbox);
  const dispatch = useAppDispatch();

  const [newSectionName, setNewSectionName] = React.useState<string>("");

  const [isSectionNameInputOpen, setSectionNameInputOpen] =
    React.useState<boolean>(false);

  const ref = React.useRef<HTMLDivElement>(null);

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

  const handleScroll = () => {
    if (!ref.current) return;
    if (ref.current.scrollHeight > ref.current.clientHeight) {
      ref.current.style.paddingRight = "1rem";
    }
  };

  return (
    <>
      {Object.values(mailboxSections).map(
        (section: MailboxSection) =>
          !Array.isArray(section) && (
            <Link key={section.id} to={`${url}/${section.slug}`}>
              <MenuTab open={location.pathname === `${url}/${section.slug}`}>
                <SpanWithOverflow>{section.name}</SpanWithOverflow>
              </MenuTab>
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
      <CustomTabsScroll ref={ref} onScroll={handleScroll}>
        <CustomTabsContainer className="test">
          {mailboxSections.customSections.map((section: MailboxSection) => (
            <CustomSectionMenuTab key={section.id} section={section} />
          ))}
        </CustomTabsContainer>
      </CustomTabsScroll>
    </>
  );
};

const CustomTabsContainer = styled.div`
  & > * {
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`;

const CustomTabsScroll = styled.div`
  height: 35rem;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 1rem;
    background-color: transparent;
    border: none;
    padding-left: 0.5rem;
    .test {
      padding-right: 1rem;
    }
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
    border: none;
    width: 0.5rem;
    .test {
      padding-right: 1rem;
    }
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border: none;
    width: 0.5rem;
    border-radius: 1.5rem;
    .test {
      padding-right: 1rem;
    }
  }
`;

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
