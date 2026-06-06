import { create } from 'zustand';

export const useStore = create((set) => ({
  mousePosition: { x: 0, y: 0 },
  setMousePosition: (x, y) => set({ mousePosition: { x, y } }),
  isDonationModalOpen: false,
  setDonationModalOpen: (isOpen) => set({ isDonationModalOpen: isOpen }),
}));
