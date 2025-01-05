// store/chatStore.js
import { create } from "zustand";

const useChatStore = create((set) => ({
  chatToggle: false,
  openToggle: () => set({ chatToggle: true }),
  closeToggle: () => set({ chatToggle: false }), // Fixed this from true to false
}));

// Export the hook that will be used in components
export default useChatStore;
