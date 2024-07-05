import { create } from 'zustand';

import { ModalStore } from '../types/modal/modal-type';

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type }),
  onClose: () => set({ type: null, isOpen: false }),
}));
