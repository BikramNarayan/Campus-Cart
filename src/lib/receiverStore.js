// lib/receiverStore.js
import { create } from "zustand";

const useReceiverStore = create((set) => ({
  receiver: null,
  updateReceiver: (newReceiver) => set({ receiver: newReceiver }),
}));

// Export both the store hook and the update function
// export const useReceiver = () => useReceiverStore((state) => state.receiver);
// export const useUpdateReceiver = () =>
//   useReceiverStore((state) => state.updateReceiver);

// Alternative: export the whole store if you need direct access
export default useReceiverStore;
