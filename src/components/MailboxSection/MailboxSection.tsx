import React from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { useAppSelector } from "../../redux/hooks/hooks";

import { LetterTab } from "../Letter/LetterTab";
import { ServiceButton } from "../UI/Buttons/ServiceButton/ServiceButton";

import { BsThreeDotsVertical } from "react-icons/bs";
import RidingTrain from "../../assets/images/gif/riding-train-0.gif";

import { MailboxSections } from "../../models/types/enums/mailbox-sections";
import { DropdownMenu } from "../UI/Dropdowns/DropdownMenu";
import { mailboxActions } from "../../redux/reducers/mailbox/mailboxSlice";
import { fadeIn } from "../../css/animations/fade-in";
import { SpanWithOverflow } from "../UI/Spans/SpanWithOverflow";

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
  const history = useHistory();

  const [mail, setMail] = React.useState<Array<Letter>>([]);
  const [section, setSection] = React.useState<MailboxSection | null>();
  const [checkedLetters, setCheckedLetters] = React.useState<Array<Letter>>([]);

  const goToIncoming = (errMessage: string) => {
    history.push("/mailbox/incoming");
    console.error(errMessage);
  };

  React.useEffect(() => {
    if (sectionType === MailboxSections.custom) {
      if (!params.customSectionId)
        return console.error("No custom section id in mailbox!");

      if (!customSections.length)
        return goToIncoming("No custom sections in mailbox!");

      const section = customSections.find(
        (section: MailboxSection) => section.id === params.customSectionId
      );

      if (!section) return goToIncoming("No custom section in mailbox!");

      setMail(section.letters);
      setSection(section);
    } else {
      const section = mailboxSections[sectionType];
      if (!section) return goToIncoming("No custom section in mailbox!");
      setMail(section.letters);
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

  const sortLettersByDate = () => {
    uncheckAll();
    setMail((letters) =>
      JSON.parse(JSON.stringify(letters)).sort((a: Letter, b: Letter) => {
        return (
          new Date(a.receivedAt).getTime() - new Date(b.receivedAt).getTime()
        );
      })
    );
  };

  const sortLettersByStatus = () => {
    uncheckAll();
    setMail((letters) =>
      JSON.parse(JSON.stringify(letters)).sort((a: Letter, b: Letter) => {
        if (a.status.seen) return 1;
        if (!a.status.seen) return -1;
        return 0;
      })
    );
  };

  const checkAll = () => {
    setCheckedLetters(mail);
  };

  const uncheckAll = () => {
    setCheckedLetters([]);
  };

  const handlers = {
    delete: {
      name:
        sectionType === MailboxSections.deleted
          ? "?????????????? ????????????????"
          : "?????????????? ????????????????????",
      handler: () => {
        deleteCheckedLetters();
        if (sectionType === MailboxSections.deleted) {
          toast.success("???????????? ?????????????? ???? ?????????? ??????????!");
        } else {
          toast.success('???????????? ???????????????????? ?? ?????????? "??????????????????".');
        }
      },
    },
    spam: {
      name: "?????????????????????? ?? ????????",
      handler: () => {
        moveLettersTo(MailboxSections.spam);
        toast.success('???????????? ???????????????????? ?? ?????????? "????????".');
      },
    },
    incoming: {
      name: "?????????????????????? ???? ????????????????",
      handler: () => {
        toast.success('???????????? ???????????????????? ?? ?????????? "????????????????".');
        moveLettersTo(MailboxSections.incoming);
      },
    },
  };

  function returnMenuOptions(): Array<DropdownMenuOption> {
    if (!checkedLetters.length) return [];
    const customSectionsHandlers = customSections
      .map((sec: MailboxSection) => ({
        name: `?????????????????????? ?? ${sec.name}`,
        handler: () => {
          moveLettersTo(sec.id);
          toast.success(`???????????? ???????????????????? ?? ?????????? "${sec.name}".`);
        },
      }))
      .filter(Boolean);

    if (sectionType === MailboxSections.incoming) {
      return [handlers.delete, handlers.spam, ...customSectionsHandlers];
    }
    if (sectionType === MailboxSections.sent) {
      return [handlers.delete, ...customSectionsHandlers];
    }
    if (sectionType === MailboxSections.drafts) {
      return [handlers.delete, ...customSectionsHandlers];
    }
    if (sectionType === MailboxSections.spam) {
      return [handlers.delete, ...customSectionsHandlers];
    }
    if (sectionType === MailboxSections.deleted) {
      return [handlers.delete, ...customSectionsHandlers];
    }
    return [...customSectionsHandlers, handlers.delete];
  }

  const TopBarComponent = () => {
    return (
      <TopBar>
        <MailboxName>
          <SpanWithOverflow>
            {section && section.name.toUpperCase()}
          </SpanWithOverflow>
        </MailboxName>
        <Controls>
          {!!mail.length && (
            <>
              <ServiceButton
                onClick={
                  checkedLetters.length === mail.length ? uncheckAll : checkAll
                }
              >
                {checkedLetters.length === mail.length
                  ? "Uncheck all"
                  : "Check all"}
              </ServiceButton>
              <ServiceButton onClick={sortLettersByDate}>
                Sort by date
              </ServiceButton>
              <ServiceButton onClick={sortLettersByStatus}>
                Sort by status
              </ServiceButton>
            </>
          )}
          <DropdownMenu options={[...returnMenuOptions()]}>
            <ServiceButton>
              <BsThreeDotsVertical />
            </ServiceButton>
          </DropdownMenu>
        </Controls>
      </TopBar>
    );
  };

  if (!mail.length)
    return (
      <MailBoxContainer>
        <TopBarComponent />
        <EmptyPageWrap>
          <h2 style={{ textAlign: "center" }}>This folder is empty</h2>
          <ImgWrapper>
            <Image src={RidingTrain} alt="This folder is empty" />
          </ImgWrapper>
        </EmptyPageWrap>
      </MailBoxContainer>
    );

  if (!section) return <span>Loading...</span>;

  return (
    <MailBoxContainer>
      <TopBarComponent />
      {mail.map((letter: Letter) => (
        <LetterTab
          letter={letter}
          sectionType={sectionType}
          section={section}
          onCheck={setCheckedLetters}
          isChecked={checkedLetters.includes(letter)}
          key={letter.id}
        />
      ))}
    </MailBoxContainer>
  );
};

const EmptyPageWrap = styled.div`
  animation: ${fadeIn} 0.2s ease forwards;
  max-height: 500px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ImgWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const MailboxName = styled.h2`
  padding: 0;
  margin: 0;
  @media (max-width: 425px) {
    max-width: 45%;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: flex-start;
  svg {
    width: 2rem;
    height: 100%;
  }
  button {
    height: 4rem;
  }
  & > * {
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
  @media (max-width: 425px) {
    flex-direction: column;
    align-items: flex-end;
    & > * {
      &:not(:last-child) {
        margin-right: 0rem;
        margin-bottom: 1rem;
      }
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
