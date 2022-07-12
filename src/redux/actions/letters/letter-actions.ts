import { MailboxSections } from "../../../models/types/enums/mailboxes";

export const letterActions = {
  deleteLetter: (state: MailboxInitialState, action: Action) => {
    if (action.payload.mailbox === MailboxSections.incoming) {
      state.incoming = state.incoming.letters.filter(
        (letter: Letter) => letter.id !== action.payload.id
      );
    }
    if (action.payload.mailbox === MailboxSections.sent) {
      state.sent = state.sent.letters.filter(
        (letter: Letter) => letter.id !== action.payload.id
      );
    }
    if (action.payload.mailbox === MailboxSections.drafts) {
      state.drafts = state.drafts.letters.filter(
        (letter: Letter) => letter.id !== action.payload.id
      );
    }
    if (action.payload.mailbox === MailboxSections.deleted) {
      state.deleted = state.deleted.letters.filter(
        (letter: Letter) => letter.id !== action.payload.id
      );
    }
    if (action.payload.mailbox === MailboxSections.spam) {
      state.spam = state.spam.letters.filter(
        (letter: Letter) => letter.id !== action.payload.id
      );
    }
  },
};
