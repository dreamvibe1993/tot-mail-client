import { createSlice } from "@reduxjs/toolkit";
import { letters } from "../../../assets/json";
import { Mailboxes } from "../../../models/types/enums/mailboxes";

const initialState: MailboxInitialState = {
  incoming: letters,
  sent: letters,
  drafts: letters,
  deleted: letters,
  spam: letters,
};

export const mailboxSlice = createSlice({
  name: "mailbox",
  initialState,
  reducers: {
    delete: (state, action) => {
      if (action.payload.mailbox === Mailboxes.incoming) {
        state.incoming = state.incoming.filter(
          (letter: Letter) => letter.id !== action.payload.id
        );
      }
      if (action.payload.mailbox === Mailboxes.sent) {
        state.sent = state.sent.filter(
          (letter: Letter) => letter.id !== action.payload.id
        );
      }
      if (action.payload.mailbox === Mailboxes.drafts) {
        state.drafts = state.drafts.filter(
          (letter: Letter) => letter.id !== action.payload.id
        );
      }
      if (action.payload.mailbox === Mailboxes.deleted) {
        state.deleted = state.deleted.filter(
          (letter: Letter) => letter.id !== action.payload.id
        );
      }
      if (action.payload.mailbox === Mailboxes.spam) {
        state.spam = state.spam.filter(
          (letter: Letter) => letter.id !== action.payload.id
        );
      }
    },
  },
});

export const mailboxActions = mailboxSlice.actions;

export default mailboxSlice.reducer;
