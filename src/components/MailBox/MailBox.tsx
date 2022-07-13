import React from "react";
import styled from "styled-components";

import { useAppSelector } from "../../redux/hooks/hooks";

import { LetterTab } from "../Letter/LetterTab";
import { ServiceButton } from "../UI/Buttons/ServiceButton/ServiceButton";

import { BsReplyFill, BsThreeDotsVertical } from "react-icons/bs";
import { MailboxSections } from "../../models/types/enums/mailboxes";
import { useParams } from "react-router-dom";

interface MailBoxProps {
  sectionType: MailboxSections;
}

export const MailBox: React.FC<MailBoxProps> = ({ sectionType }) => {
  const { incoming, sent, deleted, drafts, spam, customSections } =
    useAppSelector((state) => state.mailbox);
  const mailboxSections = useAppSelector((state) => state.mailbox);
  const params: { customSectionId: string } = useParams();

  const [mail, setMail] = React.useState<Array<Letter>>([]);
  const [section, setSection] = React.useState<MailboxSection | null>();

  React.useEffect(() => {}, [sectionType]);

  React.useEffect(() => {
    if (sectionType === MailboxSections.custom) {
      if (!params.customSectionId)
        return console.error("No custom section id in mailbox!");
      if (!customSections.length)
        return console.error("No custom sections in mailbox!");
      const section = customSections.find(
        (section: MailboxSection) => section.id === params.customSectionId
      );
      setMail(section.letters);
      setSection(section);
    } else {
      setMail(mailboxSections[sectionType].letters);
      setSection(mailboxSections[sectionType]);
    }
  }, [
    deleted,
    drafts,
    incoming,
    sent,
    spam,
    sectionType,
    params.customSectionId,
    customSections
  ]);

  if (!mail.length) return <span>No mail yet!</span>;
  if (!section) return <span>This section does not exist!</span>;

  return (
    <MailBoxContainer>
      <TopBar>
        <MailboxName>{section.name.toUpperCase()}</MailboxName>
        <Controls>
          <ServiceButton>
            <BsReplyFill />
          </ServiceButton>
          <ServiceButton>
            <BsThreeDotsVertical />
          </ServiceButton>
        </Controls>
      </TopBar>
      {mail.map((letter: Letter) => (
        <LetterTab
          letter={letter}
          sectionType={sectionType}
          section={section}
          key={letter.id}
        />
      ))}
    </MailBoxContainer>
  );
};

const MailboxName = styled.h2``;

const Controls = styled.div`
  display: flex;
  align-items: flex-start;
  svg {
    width: 2.5rem;
    height: 100%;
  }
  & > * {
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MailBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  & > * {
    &:not(:last-child) {
      margin-bottom: 2rem;
    }
  }
`;
