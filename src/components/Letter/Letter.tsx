import React, { ChangeEvent } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";

import { ServiceButton } from "../UI/Buttons/ServiceButton/ServiceButton";
import { BsReplyFill, BsThreeDotsVertical } from "react-icons/bs";
import { useAppSelector } from "../../redux/hooks/hooks";
import { useParams } from "react-router";
import { MailboxSections } from "../../models/types/enums/mailboxes";

interface LetterProps {
  mailbox: MailboxSections;
}

export const Letter: React.FC<LetterProps> = ({ mailbox }) => {
  const { incoming, sent, drafts, deleted, spam, customSections } =
    useAppSelector((state) => state.mailbox);
  const sections = useAppSelector((state) => state.mailbox);
  const params: { id: string } = useParams();
  const [letter, setLetter] = React.useState<Letter | undefined>();

  const findLetter = React.useCallback(
    function (letters: Array<Letter>): Letter | undefined {
      return letters.find((letter: Letter) => letter.id === params.id);
    },
    [params.id]
  );

  React.useEffect(() => {
    if (!params.id) return;
    let letter;
    if (mailbox === MailboxSections.incoming) {
      letter = findLetter(incoming.letters);
    }
    if (mailbox === MailboxSections.sent) {
      letter = findLetter(sent.letters);
    }
    if (mailbox === MailboxSections.drafts) {
      letter = findLetter(drafts.letters);
    }
    if (mailbox === MailboxSections.deleted) {
      letter = findLetter(deleted.letters);
    }
    if (mailbox === MailboxSections.spam) {
      letter = findLetter(spam.letters);
    }
    if (letter) setLetter(letter);
  }, [
    deleted.letters,
    drafts.letters,
    incoming.letters,
    sent.letters,
    spam.letters,
    params.id,
    mailbox,
    findLetter,
  ]);

  function moveLetter(e: ChangeEvent<HTMLSelectElement>) {
    console.log(e.target.value);
  }

  if (!letter) return <span>Loading...</span>;

  return (
    <div>
      <TopBar>
        <UserPersonal>
          <Avatar />
          <Creds>
            <Name>{letter.sender.name}</Name>
            <Email>{letter.sender.email}</Email>
          </Creds>
        </UserPersonal>
        <Controls>
          <Select name="select" onChange={moveLetter}>
            <option>Переместить вo...</option>
            {Object.values(sections).map(
              (sec: MailboxSection) =>
                !Array.isArray(sec) && (
                  <option key={sec.id} value={sec.id}>
                    {sec.name}
                  </option>
                )
            )}
            {customSections.map((sec: MailboxSection) => (
              <option key={sec.id} value={sec.id}>
                {sec.name}
              </option>
            ))}
          </Select>
          <ServiceButton>
            <BsReplyFill />
          </ServiceButton>
          <ServiceButton>
            <BsThreeDotsVertical />
          </ServiceButton>
        </Controls>
      </TopBar>
      <LetterContainer>
        <LetterLayout>
          <ReactMarkdown>{letter.message}</ReactMarkdown>
        </LetterLayout>
      </LetterContainer>
    </div>
  );
};

const Select = styled.select`
  padding: 1rem;
`;

const LetterLayout = styled.div`
  border: 1px solid gray;
  height: 100%;
  padding: 2rem;
  p {
    font-size: 1.8rem;
  }
`;

const LetterContainer = styled.div`
  flex: 1;
  padding-top: 2rem;
`;

const Controls = styled.div`
  display: flex;
  align-items: flex-start;
  svg {
    width: 1.5rem;
    height: 100%;
  }
  & > * {
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;

const Email = styled.span`
  font-size: 1.4rem;
`;

const Name = styled.span``;

const Creds = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 2.4rem;
  margin-left: 2rem;
`;

const UserPersonal = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 100%;
  background-color: gray;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
`;
