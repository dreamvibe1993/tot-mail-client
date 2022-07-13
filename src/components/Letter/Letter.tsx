import React, { ChangeEvent } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";

import { ServiceButton } from "../UI/Buttons/ServiceButton/ServiceButton";
import { BsReplyFill, BsThreeDotsVertical } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { useParams } from "react-router";
import { MailboxSections } from "../../models/types/enums/mailboxes";
import { mailboxActions } from "../../redux/reducers/mailbox/mailboxSlice";

interface LetterProps {
  sectionType: MailboxSections;
}

export const Letter: React.FC<LetterProps> = ({ sectionType }) => {
  const { incoming, sent, drafts, deleted, spam, customSections } =
    useAppSelector((state) => state.mailbox);
  const mailboxSections = useAppSelector((state) => state.mailbox);
  const sections = useAppSelector((state) => state.mailbox);
  const dispatch = useAppDispatch();
  const params: { id: string; customSectionId: string } = useParams();
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
    if (sectionType === MailboxSections.incoming) {
      letter = findLetter(incoming.letters);
    }
    if (sectionType === MailboxSections.sent) {
      letter = findLetter(sent.letters);
    }
    if (sectionType === MailboxSections.drafts) {
      letter = findLetter(drafts.letters);
    }
    if (sectionType === MailboxSections.deleted) {
      letter = findLetter(deleted.letters);
    }
    if (sectionType === MailboxSections.spam) {
      letter = findLetter(spam.letters);
    }
    if (sectionType === MailboxSections.custom) {
      letter = findLetter(
        (() => {
          const section = customSections.find(
            (section: MailboxSection) => section.id === params.customSectionId
          );
          if (section) return section.letters;
          else return [];
        })()
      );
    }
    if (letter) setLetter(letter);
  }, [
    deleted.letters,
    drafts.letters,
    incoming.letters,
    sent.letters,
    spam.letters,
    params.id,
    sectionType,
    findLetter,
  ]);

  function moveLetter(e: ChangeEvent<HTMLSelectElement>) {
    const sectionId = e.target.value;
    let sectionFrom = mailboxSections[sectionType];
    if (sectionType === MailboxSections.custom) {
      sectionFrom = mailboxSections[sectionType].find(
        (section: MailboxSection) => section.id === params.customSectionId
      );
    }
    dispatch(
      mailboxActions.moveLetter({
        from: { sectionType, section: sectionFrom },
        letter,
        to: { sectionId },
      })
    );
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
              (sec: MailboxSection, i) =>
                !Array.isArray(sec) && (
                  <option key={sec.id} value={Object.keys(sections)[i]}>
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
