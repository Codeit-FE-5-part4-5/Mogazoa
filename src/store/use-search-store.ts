import { create } from 'zustand';

interface SearchStore {
  keyword: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  search: (arg: string) => void;
}

const useSearch = create<SearchStore>((set) => ({
  keyword: '',
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  search: (keyword: string) => set({ keyword }),
}));

export default useSearch;
