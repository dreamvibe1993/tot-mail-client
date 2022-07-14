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
  const selfRef = React.useRef<HTMLDivElement>(null);

  const closeDropdown = React.useCallback(
    (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.id !== thisElementId.current) {
        if (isOpen) setIsOpen(false);
      }
    },
    [isOpen]
  );

  const openDropdown = () => {
    setIsOpen(true);
    setDropdownCoords();
  };

  async function setDropdownCoords() {
    const { current: childWrapperRef } = childrenRef;
    const { current: dropdownRef } = selfRef;
    if (!childWrapperRef || !dropdownRef) {
      return console.error("Could not get refs in dropdown.");
    }

    dropdownRef.style.opacity = "0";

    const dropdown: DOMRect = dropdownRef.getBoundingClientRect();

    if (!dropdown.height) {
      setTimeout(() => {
        setDropdownCoords();
      }, 0);
      return;
    }

    const child: DOMRect = childWrapperRef.getBoundingClientRect();

    let y = child.y + child.height;
    let x = child.x + child.width;

    dropdownRef.style.opacity = "1";

    if (y + dropdown.height >= window.innerHeight) {
      y = child.y - dropdown.height;
    }
    if (x + dropdown.width >= window.innerWidth) {
      x = child.x - dropdown.width;
    }

    setY(y);
    setX(x);
  }

  React.useEffect(() => {
    window.addEventListener("click", closeDropdown);
    return () => {
      window.removeEventListener("click", closeDropdown);
    };
  }, [closeDropdown]);

  return (
    <DropdownWrapper onClick={openDropdown} id={thisElementId.current}>
      <div style={{ pointerEvents: "none" }} ref={childrenRef}>
        {children}
      </div>
      <Dropdown x={x} y={y} ref={selfRef} isOpen={isOpen}>
        {options.map((o, i) => (
          <div key={o.name + i} onClick={() => o.handler()}>
            {o.name}
          </div>
        ))}
      </Dropdown>
    </DropdownWrapper>
  );
};

interface DropdownProps {
  x: number;
  y: number;
  isOpen: boolean;
}

const Dropdown = styled.div<DropdownProps>`
  transition: opacity 0.1s ease;
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
  display: ${(p) => (p.isOpen ? "initial" : "none")};
  & > * {
    padding: 0.5rem;
    cursor: pointer;
    user-select: none;
    transition: background-color .15s ease;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;
