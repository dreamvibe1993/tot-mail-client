interface MailboxInitialState {
  incoming: Array<Letter> | Array;
  sent: Array<Letter> | Array;
  drafts: Array<Letter> | Array;
  deleted: Array<Letter> | Array;
  spam: Array<Letter> | Array;
}
