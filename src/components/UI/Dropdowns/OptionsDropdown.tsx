import React from "react";
import styled from "styled-components";

interface OptionsDropdownProps {
  children: Array<JSX.Element> | JSX.Element;
  options: Array<{ name: string; handler: (id?: string) => void }>;
}

export const OptionsDropdown: React.FC<OptionsDropdownProps> = ({
  children,
  options = [],
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const thisElementId = React.useRef(
    `options-dropdown-id_${new Date().getTime()}`
  );

  const closeDropdown = React.useCallback(
    (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.id !== thisElementId.current) {
        if (isOpen) setIsOpen(false);
      }
    },
    [isOpen]
  );

  React.useEffect(() => {
    window.addEventListener("click", closeDropdown);
    return () => {
      window.removeEventListener("click", closeDropdown);
    };
  }, [closeDropdown]);

  return (
    <DropdownWrapper onClick={() => setIsOpen(true)} id={thisElementId.current}>
      <div style={{ pointerEvents: "none" }}>{children}</div>
      {isOpen && (
        <Dropdown>
          {options.map((o, i) => (
            <div key={o.name + i} onClick={() => o.handler()}>
              {o.name}
            </div>
          ))}
        </Dropdown>
      )}
    </DropdownWrapper>
  );
};

const Dropdown = styled.div`
  position: absolute;
  z-index: 10;
  top: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid gray;
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.2);
  & > * {
    padding: 0.5rem;
    cursor: pointer;
    user-select: none;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;
