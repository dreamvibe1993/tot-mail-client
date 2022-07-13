import { MailboxSections } from "../../../models/types/enums/mailboxes";

export const letterActions = {
  deleteLetter: (state: MailboxInitialState, action: Action) => {
    if (action.payload.sectionType === MailboxSections.incoming) {
      state.incoming = state.incoming.letters.filter(
        (letter: Letter) => letter.id !== action.payload.id
      );
    }
    if (action.payload.sectionType === MailboxSections.sent) {
      state.sent = state.sent.letters.filter(
        (letter: Letter) => letter.id !== action.payload.id
      );
    }
    if (action.payload.sectionType === MailboxSections.drafts) {
      state.drafts = state.drafts.letters.filter(
        (letter: Letter) => letter.id !== action.payload.id
      );
    }
    if (action.payload.sectionType === MailboxSections.deleted) {
      state.deleted = state.deleted.letters.filter(
        (letter: Letter) => letter.id !== action.payload.id
      );
    }
    if (action.payload.sectionType === MailboxSections.spam) {
      state.spam = state.spam.letters.filter(
        (letter: Letter) => letter.id !== action.payload.id
      );
    }
    // if (action.payload.sectionType === MailboxSections.custom) {
    //   state.customSections = state.customSections.map((sec: MailboxSection) => {
    //     if (sec.id === action.payload.id)
    //   })
      
    //   .letters.filter(
    //     (letter: Letter) => letter.id !== action.payload.id
    //   );
    // }
  },
  moveLetter: (state: MailboxInitialState, action: Action) => {
    const from = action.payload.from.sectionType as keyof typeof state;
    const to = action.payload.to.sectionId as keyof typeof state;
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
};
