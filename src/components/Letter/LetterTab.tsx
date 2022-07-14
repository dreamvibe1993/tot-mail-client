import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { BsFillTrash2Fill } from "react-icons/bs";
import { SpanWithOverflow } from "../UI/Spans/SpanWithOverflow";
import { Link, useRouteMatch } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { mailboxActions } from "../../redux/reducers/mailbox/mailboxSlice";
import { MailboxSections } from "../../models/types/enums/mailboxes";
import { CursorWrap } from "../UI/Wraps/CursorWrap";
import { BsCheck2 } from "react-icons/bs";
import { boolean } from "yup/lib/locale";

interface LetterTabProps {
  letter: Letter;
  sectionType: MailboxSections;
  section: MailboxSection;
  onCheck: Dispatch<SetStateAction<Letter[]>>;
  isChecked: boolean
}

export const LetterTab: React.FC<LetterTabProps> = ({
  letter,
  sectionType,
  section,
  onCheck = () => {},
  isChecked = false
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
    <Mail>
      <div>
        <Checkbox checked={isChecked} onClick={toggleCheckbox}>
          {isChecked && <BsCheck2 />}
        </Checkbox>
      </div>
      <VerticalDivider />
      <Creds>
        <From>{letter.sender.name}</From>
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
    </Mail>
  );
};

const VerticalDivider = styled.div`
  height: 50%;
  border-right: 1px solid gray;
`;

const Creds = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 0 2rem !important;
  width: 12%;
`;

const Preview = styled(SpanWithOverflow)`
  flex: 1;
  color: gray;
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
`;

const From = styled(SpanWithOverflow)`
  font-weight: 500;
`;

const Email = styled(SpanWithOverflow)`
  color: gray;
  font-size: 1.4rem;
`;

const SentAt = styled.span``;

const Topic = styled(SpanWithOverflow)`
  width: 12%;
  text-align: center;
`;
const Actions = styled.span``;

const Mail = styled.div`
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
`;
