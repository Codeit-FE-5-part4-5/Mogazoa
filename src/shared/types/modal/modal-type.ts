import { Followees } from '../follow/followees/followees-type';
import { Followers } from '../follow/followers/followers-type';

export type ModalType =
  | 'follow'
  | 'following'
  | 'compare'
  | 'compareConfirm'
  | 'review'
  | 'itemEdit'
  | 'itemAdd'
  | 'profileEdit'
  | 'reviewEdit'
  | 'reviewDelete'
  | 'login';

interface ModalData {
  followers?: Followers;
  followees?: Followees;
  reviewId?: number;
}

export interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}
