import React from "react";
import styled from "styled-components";

import { useAppSelector } from "../../redux/hooks/hooks";

import { LetterTab } from "../Letter/LetterTab";
import { ServiceButton } from "../UI/Buttons/ServiceButton/ServiceButton";

import { BsThreeDotsVertical } from "react-icons/bs";
import { MailboxSections } from "../../models/types/enums/mailboxes";
import { useParams } from "react-router-dom";
import { DropdownMenu } from "../UI/Dropdowns/DropdownMenu";
import { useDispatch } from "react-redux";
import { mailboxActions } from "../../redux/reducers/mailbox/mailboxSlice";

interface MailboxSectionProps {
  sectionType: MailboxSections;
}

export const MailboxSection: React.FC<MailboxSectionProps> = ({
  sectionType,
}) => {
  const { incoming, sent, deleted, drafts, spam, customSections } =
    useAppSelector((state) => state.mailbox);
  const mailboxSections = useAppSelector((state) => state.mailbox);
  const dispatch = useDispatch();
  const params: { customSectionId: string } = useParams();

  const [mail, setMail] = React.useState<Array<Letter>>([]);
  const [section, setSection] = React.useState<MailboxSection | null>();
  const [checkedLetters, setCheckedLetters] = React.useState<Array<Letter>>([]);

  React.useEffect(() => {
    if (sectionType === MailboxSections.custom) {
      if (!params.customSectionId)
        return console.error("No custom section id in mailbox!");

      if (!customSections.length)
        return console.error("No custom sections in mailbox!");

      const section = customSections.find(
        (section: MailboxSection) => section.id === params.customSectionId
      );

      if (!section) return console.error("No custom section in mailbox!");

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
    customSections,
  ]);

  const deleteCheckedLetters = () => {
    if (!section) return console.error("No section on Mailbox.tsx");
    if (sectionType === MailboxSections.deleted) {
      checkedLetters.forEach((letter: Letter) => {
        dispatch(
          mailboxActions.deleteLetter({
            sectionType,
            id: letter.id,
          })
        );
      });
      setCheckedLetters([]);
    } else {
      moveLettersTo(MailboxSections.deleted);
    }
  };

  const moveLettersTo = (where: string) => {
    if (!section) return console.error("No section on Mailbox.tsx");
    checkedLetters.forEach((letter: Letter) => {
      dispatch(
        mailboxActions.moveLetter({
          from: {
            sectionType,
            section,
          },
          letter,
          to: { sectionType: where },
        })
      );
      setCheckedLetters([]);
    });
  };

  const handlers = {
    delete: {
      name:
        sectionType === MailboxSections.deleted
          ? "Удалить навсегда"
          : "Удалить отмеченные",
      handler: () => {
        deleteCheckedLetters();
      },
    },
    spam: {
      name: "Переместить в спам",
      handler: () => {
        moveLettersTo(MailboxSections.spam);
      },
    },
    incoming: {
      name: "Переместить во входящие",
      handler: () => {
        moveLettersTo(MailboxSections.incoming);
      },
    },
  };

  function returnMenuOptions(): Array<DropdownMenuOption> {
    if (!checkedLetters.length) return [];
    if (sectionType === MailboxSections.incoming) {
      return [handlers.delete, handlers.spam];
    }
    if (sectionType === MailboxSections.sent) {
      return [handlers.delete];
    }
    if (sectionType === MailboxSections.drafts) {
      return [handlers.delete];
    }
    if (sectionType === MailboxSections.spam) {
      return [handlers.delete];
    }
    if (sectionType === MailboxSections.deleted) {
      return [handlers.delete];
    }
    return [handlers.delete];
  }

  if (!mail.length) return <span>No mail yet!</span>;

  if (!section) return <span>This section does not exist!</span>;

  return (
    <MailBoxContainer>
      <TopBar>
        <MailboxName>{section.name.toUpperCase()}</MailboxName>
        <Controls>
          <DropdownMenu
            options={[
              ...returnMenuOptions(),
              ...customSections
                .map((sec: MailboxSection) => ({
                  name: `Переместить в ${sec.name}`,
                  handler: () => {
                    moveLettersTo(sec.id);
                  },
                }))
                .filter(Boolean),
            ]}
          >
            <ServiceButton>
              <BsThreeDotsVertical />
            </ServiceButton>
          </DropdownMenu>
        </Controls>
      </TopBar>
      {mail.map((letter: Letter) => (
        <LetterTab
          letter={letter}
          sectionType={sectionType}
          section={section}
          onCheck={setCheckedLetters}
          key={letter.id}
        />
      ))}
    </MailBoxContainer>
  );
};

const MailboxName = styled.h2`
  padding: 0;
  margin: 0;
`;

const Controls = styled.div`
  display: flex;
  align-items: flex-start;
  svg {
    width: 2rem;
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
  align-items: flex-start;
  min-height: 4rem;
`;

const MailBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    &:not(:last-child) {
      margin-bottom: 2rem;
    }
  }
`;
