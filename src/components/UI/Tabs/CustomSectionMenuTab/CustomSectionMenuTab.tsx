import React from "react";
import { BsThreeDotsVertical, BsCheck2 } from "react-icons/bs";
import { Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { fadeIn } from "../../../../css/animations/fade-in";
import { useAppDispatch } from "../../../../redux/hooks/hooks";
import { mailboxActions } from "../../../../redux/reducers/mailbox/mailboxSlice";
import { ServiceButton } from "../../Buttons/ServiceButton/ServiceButton";
import { DropdownMenu } from "../../Dropdowns/DropdownMenu";
import { ServiceInput } from "../../Inputs/ServiceInput";
import { CursorWrap } from "../../Wraps/CursorWrap";
import { MenuTab } from "../MenuTab";

interface CustomSecMenuTabProps {
  section: MailboxSection;
}

export const CustomSectionMenuTab: React.FC<CustomSecMenuTabProps> = ({
  section,
}) => {
  const { url } = useRouteMatch();
  const dispatch = useAppDispatch();

  const [isTabRenaming, setTabRenaming] = React.useState<boolean>(false);
  const [newSectionName, setNewSectionName] = React.useState<string>("");

  const thisElementId = React.useRef(
    `custom-section-tab-id_${new Date().getTime()}`
  );

  const stopTabRenaming = React.useCallback(
    (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.id !== thisElementId.current) {
        if (isTabRenaming) setTabRenaming(false);
      }
    },
    [isTabRenaming]
  );

  React.useEffect(() => {
    window.addEventListener("click", stopTabRenaming, true);
    return () => {
      window.removeEventListener("click", stopTabRenaming, true);
    };
  }, [stopTabRenaming]);

  function deleteNewSection(id: string): void {
    dispatch(mailboxActions.deleteSection({ id }));
    setNewSectionName("");
  }

  function startRenamingTab(): void {
    setTabRenaming(true);
    setNewSectionName(section.name);
  }

  function renameTab(id: string): void {
    if (!newSectionName.length) return;
    dispatch(mailboxActions.renameSection({ name: newSectionName, id }));
    setTabRenaming(false);
    setNewSectionName("");
  }

  function copyTab(id: string): void {
    dispatch(mailboxActions.copySection({ id }));
    setNewSectionName("");
  }
  
  return (
    <CustomTab id={thisElementId.current}>
      {isTabRenaming ? (
        <TabNameInputs>
          <SpecialInput
            id={thisElementId.current}
            type="text"
            placeholder="Type new section name"
            value={newSectionName.slice(0, 21)}
            onChange={(e) => setNewSectionName(e.target.value)}
            maxLength={20}
          />
          <ServiceButton
            id={thisElementId.current}
            onClick={() => renameTab(section.id)}
          >
            <div style={{ pointerEvents: "none", display: "flex", alignItems: "center" }}>
              <BsCheck2 />
            </div>
          </ServiceButton>
        </TabNameInputs>
      ) : (
        <Link to={`${url}/${section.slug}`}>{section.name}</Link>
      )}
      <DropdownMenu
        options={[
          {
            name: "удалить",
            handler: () => deleteNewSection(section.id),
          },
          { name: "переименовать", handler: () => startRenamingTab() },
          { name: "копировать", handler: () => copyTab(section.id) },
        ]}
      >
        <CursorWrap>
          <BsThreeDotsVertical />
        </CursorWrap>
      </DropdownMenu>
    </CustomTab>
  );
};

const SpecialInput = styled.input`
  width: 70%;
  margin-right: .5rem;
  padding: 0;
  border: none;
  font-size: 1.6rem;
  outline: none;
  &::placeholder {
    font-size: 1rem;
  }
`

const TabNameInputs = styled.div`
  display: flex;
  button {
    padding: 0rem 1rem;
  }
`;

const CustomTab = styled(MenuTab)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: ${fadeIn} .2s ease;
  z-index: 1;
`;
