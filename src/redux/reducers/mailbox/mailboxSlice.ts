import { createSlice } from "@reduxjs/toolkit";
import {
  deleted,
  drafts,
  incomingLetters,
  sentLetters,
  spam,
} from "../../../assets/json";
import { letterActions } from "../../actions/letters/letter-actions";
import { sectionActions } from "../../actions/sections/section-actions";
import { v4 as uuidv4 } from "uuid";

const makeIdsUniqueInLetters = (letters: Array<Letter>) =>
  letters.map((l) => {
    l.id = uuidv4() + l.id + new Date().getTime();
    return l;
  });

const initialState: MailboxInitialState = {
  incoming: {
    name: "входящие",
    id: "incoming-0",
    letters: incomingLetters,
    slug: "incoming",
  },
  sent: {
    name: "отправленные",
    id: "sent-0",
    letters: sentLetters,
    slug: "sent",
  },
  drafts: {
    name: "черновики",
    id: "drafts-0",
    letters: drafts,
    slug: "drafts",
  },
  deleted: {
    name: "удаленные",
    id: "deleted-0",
    letters: deleted,
    slug: "deleted",
  },
  spam: {
    name: "спам",
    id: "spam-0",
    letters: spam,
    slug: "spam",
  },
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
