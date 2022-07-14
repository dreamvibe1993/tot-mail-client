import React, { ChangeEvent } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

import { BsX as BsXLg } from "react-icons/bs";

import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { MailboxSections } from "../../models/types/enums/mailbox-sections";
import { mailboxActions } from "../../redux/reducers/mailbox/mailboxSlice";
import { CursorWrap } from "../UI/Wraps/CursorWrap";
import { useGoBack } from "../../lib/hooks/useGoBack";

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
  const closeLetter = useGoBack();

  const [letter, setLetter] = React.useState<Letter | undefined>();

  const findLetter = React.useCallback(
    function (letters: Array<Letter>): Letter | undefined {
      return letters.find((letter: Letter) => letter.id === params.id);
    },
    [params.id]
  );

  React.useEffect(() => {
    if (!letter) return;
    dispatch(
      mailboxActions.changeLetterStatus({
        sectionType,
        sectionId: params.customSectionId,
        letterId: letter.id,
      })
    );
  }, [letter]);

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
    else closeLetter();
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
    const sectionTypeTo = e.target.value;
    let sectionFrom = mailboxSections[sectionType];
    if (sectionType === MailboxSections.custom) {
      sectionFrom = mailboxSections[sectionType].find(
        (section: MailboxSection) => section.id === params.customSectionId
      );
    }
    if (!letter) return console.error("No letter in Letter.tsx");
    dispatch(
      mailboxActions.moveLetter({
        from: { sectionType, section: sectionFrom },
        letter,
        to: { sectionType: sectionTypeTo },
      })
    );
  }


  if (!letter) return <span>Loading...</span>;

  return (
    <>
      <WindowControls>
        <CursorWrap>
          <BsXLg onClick={closeLetter} />
        </CursorWrap>
      </WindowControls>
      <LetterWindowContainer>
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
              <option>Переместить в...</option>
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
          </Controls>
        </TopBar>
        <LetterContainer>
          <LetterLayout>
            <ReactMarkdown>{letter.message}</ReactMarkdown>
          </LetterLayout>
        </LetterContainer>
      </LetterWindowContainer>
    </>
  );
};

const LetterWindowContainer = styled.div`
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.2);
  height: 100%;
  overflow-y: auto;
  flex: 1;
  @media (max-width: 425px) {
    padding: 0.5rem;
  }
`;

const WindowControls = styled.div`
  height: 2rem;
  margin-bottom: 1rem;
  svg {
    width: 2rem;
    height: 100%;
  }
`;

const Select = styled.select`
  padding: 1rem;
`;

const LetterLayout = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 2rem;
  background-color: white;
  box-shadow: 0px 5px 5px 2px rgba(0, 0, 0, 0.1);

  p {
    font-size: 1.8rem;
  }
`;

const LetterContainer = styled.div`
  flex: 1;
  padding-top: 2rem;
  overflow-y: auto;
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
  @media (max-width: 425px) {
    flex-direction: column;
    align-items: center;
    & > * {
      margin-top: 1rem;
    }
  }
`;
