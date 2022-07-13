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
  const [x, setX] = React.useState<number>(0);
  const [y, setY] = React.useState<number>(0);
  const thisElementId = React.useRef(
    `options-dropdown-id_${new Date().getTime()}`
  );

  const childrenRef = React.useRef<HTMLDivElement>(null);

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
    const { current: childrenWrapper } = childrenRef;
    if (!childrenWrapper) return;
    const clientRect = childrenWrapper.getBoundingClientRect();
    setX(clientRect.x + clientRect.width);
    setY(clientRect.y + clientRect.height);
  }, []);

  React.useEffect(() => {
    window.addEventListener("click", closeDropdown);
    return () => {
      window.removeEventListener("click", closeDropdown);
    };
  }, [closeDropdown]);

  return (
    <DropdownWrapper onClick={() => setIsOpen(true)} id={thisElementId.current}>
      <div style={{ pointerEvents: "none" }} ref={childrenRef}>
        {children}
      </div>
      {isOpen && (
        <Dropdown x={x} y={y}>
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

interface DropdownProps {
  x: number;
  y: number;
}

const Dropdown = styled.div<DropdownProps>`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
  transform: ${(p) => `translate(${p.x}px, ${p.y}px)`};
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
