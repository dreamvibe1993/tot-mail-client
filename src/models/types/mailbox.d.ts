interface MailboxSection {
  name: string;
  id: string;
  letters: Array<Letter> | Array;
  slug: string;
}

interface MailboxInitialState {
  incoming: MailboxSection;
  sent: MailboxSection;
  drafts: MailboxSection;
  deleted: MailboxSection;
  spam: MailboxSection;
  customSections: Array<MailboxSection> | Array;
}
