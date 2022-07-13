import CyrillicToTranslit from "cyrillic-to-translit-js";

interface AddDigitAction {
  (name: string): string;
}

const setSectionData = (
  string: string
): { name: string; id: string; slug: string } => {
  const newBoxId = CyrillicToTranslit().transform(string, "_").toLowerCase();
  return {
    name: string,
    id: newBoxId,
    slug: newBoxId,
  };
};

const digitSpaceRegex = /\s\d+$/gm;
const digitRegex = /\d+$/gm;

const addDigitToName: AddDigitAction = (name) => {
  const digitWithSpaceInName: RegExpMatchArray | null =
    name.match(digitSpaceRegex);
  if (digitWithSpaceInName) {
    const nameWithoutDigit = name.replace(digitSpaceRegex, "");
    return nameWithoutDigit + " " + (Number(digitWithSpaceInName[0]) + 1);
  }
  return name + " " + 1;
};

export const sectionActions = {
  addSection: (state: MailboxInitialState, action: Action) => {
    const newSection = setSectionData(action.payload.name);
    const newBox = {
      ...newSection,
      letters: [],
    };
    state.customSections = [...state.customSections, newBox];
  },
  deleteSection: (state: MailboxInitialState, action: Action) => {
    state.customSections = state.customSections.filter(
      (section: MailboxSection) => section.id !== action.payload.id
    );
  },
  renameSection: (state: MailboxInitialState, action: Action) => {
    state.customSections = state.customSections.map(
      (section: MailboxSection) => {
        if (section.id === action.payload.id) {
          const updatedSection = setSectionData(action.payload.name);
          section = { ...updatedSection, ...section.letters };
        }
        if (!section.letters) section.letters = [];
        return section;
      }
    );
  },
  copySection: (state: MailboxInitialState, action: Action) => {
    const customSections = state.customSections;

    state.customSections = customSections.reduce(
      (acc: Array<MailboxSection>, section: MailboxSection) => {
        if (section.id !== action.payload.id) {
          acc.push(section);
          return acc;
        }
        for (let i = 0; i < 2; i++) {
          acc.push(section);

          const nameWithoutDigit = section.name.replace(digitSpaceRegex, "");

          let sectionCopy = setSectionData(addDigitToName(section.name)); //name + 1

          const sameSectionsDigits = state.customSections
            .filter((section: MailboxSection) => {
              const sectionName = sectionCopy.name.replace(digitSpaceRegex, "");
              return section.name.includes(sectionName);
            })
            .map((section: MailboxSection) => {
              const digit = section.name.match(digitRegex);
              if (digit) return Number(digit[0]);
              return 0;
            })
            .sort((a: number, b: number) => a - b);

          if (sameSectionsDigits.length) {
            const greatestNumber = sameSectionsDigits.reverse()[0];
            const newName = addDigitToName(
              nameWithoutDigit + " " + greatestNumber
            );
            sectionCopy = setSectionData(newName);
          }

          section = {
            ...sectionCopy,
            letters: section.letters,
          };
        }
        return acc;
      },
      []
    );
  },
};
