import { Followees } from '../follow/followees/followees-type';
import { Followers } from '../follow/followers/followers-type';

export type ModalType =
  | 'follow'
  | 'compare'
  | 'compareConfirm'
  | 'review'
  | 'itemEdit'
  | 'itemAdd'
  | 'profileEdit';

interface ModalData {
  followers?: Followers;
  followees?: Followees;
}

export interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}
