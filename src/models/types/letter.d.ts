interface Letter {
  id: string;
  sender: {
    name: string;
    email: string;
  };
  recipient: {
    name: string;
    email: string;
  };
  status: {
    seen: boolean;
  };
  topic: string;
  sentAt: string;
  receivedAt: string;
  message: string;
}
