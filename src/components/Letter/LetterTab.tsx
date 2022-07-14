import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { Link, useRouteMatch } from "react-router-dom";

import { BsFillTrash2Fill } from "react-icons/bs";
import { BsCheck2 } from "react-icons/bs";

import { SpanWithOverflow } from "../UI/Spans/SpanWithOverflow";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { mailboxActions } from "../../redux/reducers/mailbox/mailboxSlice";
import { MailboxSections } from "../../models/types/enums/mailbox-sections";
import { CursorWrap } from "../UI/Wraps/CursorWrap";

interface LetterTabProps {
  letter: Letter;
  sectionType: MailboxSections;
  section: MailboxSection;
  onCheck: Dispatch<SetStateAction<Letter[]>>;
  isChecked: boolean;
}

export const LetterTab: React.FC<LetterTabProps> = ({
  letter,
  sectionType,
  section,
  onCheck = () => {},
  isChecked = false,
}) => {
  const dispatch = useAppDispatch();
  const { url } = useRouteMatch();

  function deleteLetter(): void {
    dispatch(
      mailboxActions.deleteLetter({ id: letter.id, sectionType, section })
    );
  }

  function toggleCheckbox(): void {
    onCheck((prev) => {
      if (prev.includes(letter)) {
        return prev.filter(
          (checkedLetter: Letter) => checkedLetter.id !== letter.id
        );
      } else {
        return [...new Set([...prev, letter])];
      }
    });
  }

  React.useEffect(() => {
    return () => {
      onCheck([]);
    };
  }, []);

  if (!letter) return <span>Something went wrong...</span>;

  return (
    <LetterTabContainer>
      <Status seen={letter.status.seen}>
        <StatusWord>{letter.status.seen ? "seen" : "new"}</StatusWord>
        <StatusIndicator seen={letter.status.seen} />
      </Status>
      <VerticalDivider />
      <div>
        <Checkbox checked={isChecked} onClick={toggleCheckbox}>
          {isChecked && <BsCheck2 />}
        </Checkbox>
      </div>
      <VerticalDivider />
      <Creds>
        <From>
          <Link to={`${url}/${letter.id}`}>{letter.sender.name}</Link>
        </From>

        <Email>{letter.sender.email}</Email>
      </Creds>
      <VerticalDivider />
      <Topic>{letter.topic}</Topic>
      <VerticalDivider />
      <Preview>
        <Link to={`${url}/${letter.id}`}>{letter.message}</Link>
      </Preview>
      <VerticalDivider />
      <Actions>
        <CursorWrap>
          <BsFillTrash2Fill onClick={deleteLetter} />
        </CursorWrap>
      </Actions>
      <VerticalDivider />
      <SentAt>
        {new Date(letter.receivedAt).toLocaleString("default", {
          weekday: "short",
        }) + " "}
        {new Date(letter.receivedAt).getHours()}:
        {new Date(letter.receivedAt).getMinutes()}
      </SentAt>
    </LetterTabContainer>
  );
};

interface StatusProps {
  seen: boolean;
}

const StatusIndicator = styled.div<StatusProps>`
  display: none;
  width: 1rem;
  height: 1rem;
  border-radius: 100%;
  background-color: ${(p) => (p.seen ? "rgba(0,0,0,.3)" : "green")};
  @media (max-width: 425px) {
    display: block;
  }
`;

const StatusWord = styled.span`
  @media (max-width: 425px) {
    display: none;
  }
`;

const Status = styled.span<StatusProps>`
  font-weight: 600;
  color: ${(p) => (p.seen ? "rgba(0,0,0,.3)" : "green")};
  @media (max-width: 425px) {
    /* margin-right: .5rem; */
  }
`;

const VerticalDivider = styled.div`
  height: 50%;
  border-right: 1px solid gray;
  @media (max-width: 425px) {
    display: none;
  }
`;

const Creds = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 0 2rem !important;
  width: 12%;
  @media (max-width: 425px) {
    padding: 0 !important;
    min-width: 8rem;
  }
`;

const Preview = styled(SpanWithOverflow)`
  flex: 1;
  color: gray;
  @media (max-width: 425px) {
    display: none;
  }
`;

interface CheckboxProps {
  checked: boolean;
}

const Checkbox = styled.div<CheckboxProps>`
  width: 2rem;
  height: 2rem;
  border: 1px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  /* background-color: ${(p) => p.checked && "rgba(0,0,0,.1)"}; */
  @media (max-width: 425px) {
    width: 1.3rem;
    height: 1.3rem;
  }
`;

const From = styled(SpanWithOverflow)`
  font-weight: 500;
  @media (max-width: 425px) {
    width: 100%;
    text-align: center;
  }
`;

const Email = styled(SpanWithOverflow)`
  color: gray;
  font-size: 1.4rem;
  @media (max-width: 425px) {
    display: none;
  }
`;

const SentAt = styled(SpanWithOverflow)`
  min-width: 8.7rem;
  text-align: center;
  @media (max-width: 425px) {
    width: 5rem;
  }
`;

const Topic = styled(SpanWithOverflow)`
  width: 12%;
  text-align: center;
  @media (max-width: 425px) {
    display: none;
  }
`;
const Actions = styled.span`
  display: flex;
  justify-content: center;
`;

const LetterTabContainer = styled.div`
  border: 1px solid grey;
  border-radius: 15px;
  padding: 2rem 2rem;
  display: flex;
  align-items: center;
  & > * {
    &:nth-child(odd) {
      padding: 0 1rem;
    }
  }
  @media (max-width: 425px) {
    padding: 1rem 1rem;
    font-size: 1.6rem;
    justify-content: space-between;
    overflow: hidden;
    & > * {
      &:not(:last-child) {
        padding: 0;
        margin: 0.5rem;
      }
      &:last-child {
        padding: 0;
      }
    }
  }
`;
