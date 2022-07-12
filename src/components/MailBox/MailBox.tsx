import React from "react";
import styled from "styled-components";

import { useAppSelector } from "../../redux/hooks/hooks";

import { LetterTab } from "../Letter/LetterTab";
import { ServiceButton } from "../UI/Buttons/ServiceButton/ServiceButton";

import { BsReplyFill, BsThreeDotsVertical } from "react-icons/bs";
import { Mailboxes } from "../../models/types/enums/mailboxes";

interface MailBoxProps {
  type: Mailboxes;
}

export const MailBox: React.FC<MailBoxProps> = ({ type }) => {
  const { incoming, sent, deleted, drafts, spam } = useAppSelector(
    (state) => state.mailbox
  );

  const [mail, setMail] = React.useState<Array<Letter>>([]);

  React.useEffect(() => {
    if (type === Mailboxes.incoming) setMail(incoming);
    if (type === Mailboxes.sent) setMail(sent);
    if (type === Mailboxes.deleted) setMail(deleted);
    if (type === Mailboxes.drafts) setMail(drafts);
    if (type === Mailboxes.spam) setMail(spam);
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
