export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface MessageSender {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Message {
  _id: string;
  chat: string;
  sender: MessageSender | string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatLastMessage {
  _id: string;
  text: string;
  sender: string;
  createdAt: string;
}

export interface Chat {
  _id: string;
  participant: MessageSender; // For 1-on-1, formatted by backend or frontend
  participants?: MessageSender[]; // For groups
  lastMessage: ChatLastMessage | null;
  lastMessageAt: string;
  createdAt: string;

  // Group specific
  isGroup?: boolean;
  name?: string;
  groupImage?: string;
  description?: string;
  admin?: string; // ID of admin
  settings?: {
    onlyAdminsCanPost: boolean;
    onlyAdminsCanEditInfo: boolean;
  };
  inviteCode?: string;
}
