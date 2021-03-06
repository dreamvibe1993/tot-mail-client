import { MailboxSections } from "../../../models/types/enums/mailbox-sections";

interface MoveLetterAction {
  payload: {
    from: { sectionType: MailboxSections; section: MailboxSection };
    letter: Letter;
    to: { sectionType: string };
  };
  type: string;
}

interface ChangeLetterStatusAction {
  payload: {
    sectionType: MailboxSections;
    sectionId: string;
    letterId: string;
  };
  type: string;
}

export const letterActions = {
  deleteLetter: (state: MailboxInitialState, action: Action) => {
    if (action.payload.sectionType === MailboxSections.incoming) {
      state.incoming.letters = state.incoming.letters.filter(
        (letter: Letter) => letter.id !== action.payload.id
      );
    }
    if (action.payload.sectionType === MailboxSections.sent) {
      state.sent.letters = state.sent.letters.filter(
        (letter: Letter) => letter.id !== action.payload.id
      );
    }
    if (action.payload.sectionType === MailboxSections.drafts) {
      state.drafts.letters = state.drafts.letters.filter(
        (letter: Letter) => letter.id !== action.payload.id
      );
    }
    if (action.payload.sectionType === MailboxSections.deleted) {
      state.deleted.letters = state.deleted.letters.filter(
        (letter: Letter) => letter.id !== action.payload.id
      );
    }
    if (action.payload.sectionType === MailboxSections.spam) {
      state.spam.letters = state.spam.letters.filter(
        (letter: Letter) => letter.id !== action.payload.id
      );
    }
    if (action.payload.sectionType === MailboxSections.custom) {
      state.customSections = state.customSections.map((sec: MailboxSection) => {
        if (sec.id === action.payload.section.id) {
          sec.letters = sec.letters.filter(
            (letter: Letter) => letter.id !== action.payload.id
          );
        }
        return sec;
      });
    }
  },
  moveLetter: (state: MailboxInitialState, action: MoveLetterAction) => {
    const from = action.payload.from.sectionType as keyof typeof state;
    const to = action.payload.to.sectionType as keyof typeof state;
    const letter = action.payload.letter;

    if (from === MailboxSections.custom) {
      state[from] = state[from].map((sec: MailboxSection) => {
        if (sec.id === action.payload.from.section.id) {
          sec.letters = sec.letters.filter(
            (letter: Letter) => action.payload.letter.id !== letter.id
          );
        }
        return sec;
      });
    } else {
      // Not custom folders
      state[from].letters = state[from].letters.filter(
        (letter: Letter) => action.payload.letter.id !== letter.id
      );
    }

    if (!state[to]) {
      state.customSections = state.customSections.map((sec: MailboxSection) => {
        if (sec.id === to) {
          sec.letters = [...sec.letters, letter];
        }
        return sec;
      });
    } else {
      // Not custom folders
      const updatedLetters = [...state[to].letters, action.payload.letter];
      state[to].letters = updatedLetters;
    }
  },
  changeLetterStatus: (state: MailboxInitialState, action: ChangeLetterStatusAction) => {
    const sectionType = action.payload.sectionType as keyof typeof state;

    const setSeenStatus = (letter: Letter) => {
      if (action.payload.letterId === letter.id) {
        letter.status.seen = true;
      }
      return letter;
    };

    if (Array.isArray(state[sectionType])) {
      state[sectionType] = state[sectionType].map((section: MailboxSection) => {
        if (section.id === action.payload.sectionId) {
          section.letters = section.letters.map(setSeenStatus);
        }
        return section;
      });
      return;
    }

    state[sectionType].letters = state[sectionType].letters.map(setSeenStatus);
  },
};
