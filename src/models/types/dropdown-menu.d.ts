interface DropdownMenuOption {
  name: string;
  handler: (id?: string) => void;
}

interface DropdownMenuProps {
  children: Array<JSX.Element> | JSX.Element;
  options: Array<DropdownMenuOption>;
}
