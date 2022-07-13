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
  const digitWithSpaceInName: RegExpMatchArray | null = name.match(digitSpaceRegex);
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
      (acc: Array<MailboxSection>, currentSection: MailboxSection) => {
        if (currentSection.id === action.payload.id) {
          for (let i = 0; i < 2; i++) {
            acc.push(currentSection);

            let copiedSection = setSectionData(
              addDigitToName(currentSection.name)
            );

            const sameSections = state.customSections.filter(
              (section: MailboxSection) => {
                const copiedSectionName = copiedSection.name.replace(
                  digitSpaceRegex,
                  ""
                );
                return section.name.includes(copiedSectionName);
              }
            );

            if (sameSections.length) {
              const onlyDigits = sameSections
                .map((section: MailboxSection) => {
                  const digit = section.name.match(digitRegex);
                  if (digit) return Number(digit[0]);
                  return 0;
                })
                .filter(Boolean)
                .sort((a: number, b: number) => a - b);
              const newName = addDigitToName(
                copiedSection.name.replace(digitRegex, "") +
                  (onlyDigits.reverse()[0] || "0")
              );
              copiedSection = setSectionData(newName);
            }

            currentSection = {
              ...copiedSection,
              letters: currentSection.letters,
            };
          }
          return acc;
        }
        
        acc.push(currentSection);
        return acc;
      },
      []
    );
  },
};
