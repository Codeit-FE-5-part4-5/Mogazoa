export type ModalType =
  | 'follow'
  | 'compare'
  | 'compareConfirm'
  | 'review'
  | 'itemEdit';

export interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
}
