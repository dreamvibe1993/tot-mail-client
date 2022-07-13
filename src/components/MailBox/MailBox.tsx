import React from "react";
import styled from "styled-components";

import { useAppSelector } from "../../redux/hooks/hooks";

import { LetterTab } from "../Letter/LetterTab";
import { ServiceButton } from "../UI/Buttons/ServiceButton/ServiceButton";

import { BsReplyFill, BsThreeDotsVertical } from "react-icons/bs";
import { MailboxSections } from "../../models/types/enums/mailboxes";
import { useParams } from "react-router-dom";

interface MailBoxProps {
  type: MailboxSections;
}

export const MailBox: React.FC<MailBoxProps> = ({ type }) => {
  const { incoming, sent, deleted, drafts, spam, customSections } =
    useAppSelector((state) => state.mailbox);
  const params: { customSectionId: string } = useParams();

  const [mail, setMail] = React.useState<Array<Letter>>([]);

  React.useEffect(() => {
    if (!params.customSectionId) return;
    if (type === MailboxSections.custom)
      setMail(
        customSections.find(
          (section: MailboxSection) => section.id === params.customSectionId
        )
      );
  }, []);

  React.useEffect(() => {
    if (type === MailboxSections.incoming) setMail(incoming.letters);
    if (type === MailboxSections.sent) setMail(sent.letters);
    if (type === MailboxSections.deleted) setMail(deleted.letters);
    if (type === MailboxSections.drafts) setMail(drafts.letters);
    if (type === MailboxSections.spam) setMail(spam.letters);
  }, [deleted, drafts, incoming, sent, spam, type]);

  if (!mail.length) return <span>No mail yet!</span>;

  return (
    <MailBoxContainer>
      <TopBar>
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
        <LetterTab letter={letter} mailbox={type} key={letter.id} />
      ))}
    </MailBoxContainer>
  );
};

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
