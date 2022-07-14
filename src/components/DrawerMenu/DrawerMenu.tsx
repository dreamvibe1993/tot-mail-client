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
import { fadeIn } from "../../css/animations/fade-in";

export const DrawerMenu = () => {
  const { url } = useRouteMatch();
  const location = useLocation();
  const mailboxSections = useAppSelector((state) => state.mailbox);
  const dispatch = useAppDispatch();

  const [newSectionName, setNewSectionName] = React.useState<string>("");
  const [drawerHeight, setDrawerHeight] = React.useState<number>(0);

  const [isSectionNameInputOpen, setSectionNameInputOpen] =
    React.useState<boolean>(false);

  const CustomTabsScrollWrapper = React.useRef<HTMLDivElement>(null);

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

  const addStylesIfScroll = React.useCallback(
    function (): void {
      const { current: tabsScrollWrap } = CustomTabsScrollWrapper;
      if (!tabsScrollWrap) return;
      if (tabsScrollWrap.scrollHeight > tabsScrollWrap.clientHeight) {
        tabsScrollWrap.style.padding = "1rem";
        tabsScrollWrap.style.backgroundColor = "rgba(0,0,0,.1)";
        tabsScrollWrap.style.borderTop = "1px solid rgba(0,0,0,.2)";
        tabsScrollWrap.style.borderBottom = "1px solid rgba(0,0,0,.2)";
        tabsScrollWrap.style.borderRadius = "5px";
      }
    },
    [CustomTabsScrollWrapper.current]
  );

  React.useEffect(() => {
    const { current: tabsScrollWrap } = CustomTabsScrollWrapper;
    if (!tabsScrollWrap) return;
    setDrawerHeight(tabsScrollWrap.clientHeight);
  }, []);

  React.useEffect(() => {
    window.addEventListener("click", addStylesIfScroll);
    return () => {
      window.removeEventListener("click", addStylesIfScroll);
    };
  }, []);

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
      <ServiceButton onClick={openSectionNameInput}>+ создать</ServiceButton>
      {isSectionNameInputOpen && (
        <SectionNameInputContainer>
          <ServiceInput
            type="text"
            placeholder="Type new section name"
            value={newSectionName.slice(0, 21)}
            onChange={(e) => setNewSectionName(e.target.value)}
            maxLength={20}
          />
          <ServiceButton onClick={addNewSection}>
            <BsCheck2 />
          </ServiceButton>
        </SectionNameInputContainer>
      )}
      <CustomTabsScroll
        ref={CustomTabsScrollWrapper}
        onClick={addStylesIfScroll}
        drawerHeight={drawerHeight}
      >
        <CustomTabsContainer>
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

interface CustomTabsScrollProps {
  drawerHeight: number;
}

const CustomTabsScroll = styled.div<CustomTabsScrollProps>`
  flex: ${(p) => (p.drawerHeight ? "none" : 1)};
  height: ${(p) => p.drawerHeight + "px" || "none"};
  transition: all 0.2s ease;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 1rem;
    background-color: transparent;
    border: none;
    padding-left: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
    border: none;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border: none;
    border-radius: 1.5rem;
  }
`;

const SectionNameInputContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: stretch;
  overflow: hidden;
  animation: ${fadeIn} 0.2s ease;
  button {
    width: 30%;
  }
  input {
    width: 70%;
    margin-right: 1rem;
    &::placeholder {
      font-style: oblique;
    }
  }
`;
