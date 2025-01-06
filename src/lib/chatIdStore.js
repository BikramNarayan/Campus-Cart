// lib/chatIdStore.js
import { create } from "zustand";

const chatIdStore = create((set) => ({
  chatId: null,
  chatIdName: null,
  chatIdPhoto: "",
  updatechatId: (newchatId) => set({ chatId: newchatId }),
  updateChatIdName: (newchatId) => set({ chatIdName: newchatId }),
  updateChatIdPhoto: (newchatId) => set({ chatIdPhoto: newchatId }),
}));

export default chatIdStore;
