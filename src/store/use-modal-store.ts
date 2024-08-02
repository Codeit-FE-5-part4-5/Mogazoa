import { create } from 'zustand';

import { ModalStore } from '../types/modal/modal-type';

const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));

export default useModal;
