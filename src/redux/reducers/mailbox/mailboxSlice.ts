import { createSlice } from "@reduxjs/toolkit";
import { letters } from "../../../assets/json";
import { letterActions } from "../../actions/letters/letter-actions";
import { sectionActions } from "../../actions/sections/section-actions";

const initialState: MailboxInitialState = {
  incoming: { name: "входящие", id: "incoming-0", letters, slug: "incoming" },
  sent: { name: "отправленные", id: "sent-0", letters, slug: "sent" },
  drafts: { name: "черновики", id: "drafts-0", letters, slug: "drafts" },
  deleted: { name: "удаленные", id: "deleted-0", letters, slug: "deleted" },
  spam: { name: "спам", id: "spam-0", letters, slug: "spam" },
  customSections: [],
};

export const mailboxSlice = createSlice({
  name: "mailbox",
  initialState,
  reducers: {
    ...letterActions,
    ...sectionActions,
  },
});

export const mailboxActions = mailboxSlice.actions;

export default mailboxSlice.reducer;
