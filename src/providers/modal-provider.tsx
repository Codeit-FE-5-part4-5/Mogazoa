import { useEffect, useState } from 'react';
import {
  CompareConfirmModal,
  ReviewModal,
  ItemEditModal,
  ItemAddModal,
  LoginModal,
  CompareNoticeModal,
  FollowModal,
  FollowingModal,
  ProfileEditModal,
  UnFollowModal,
} from '@/components/shared';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <FollowModal />
      <FollowingModal />
      <CompareConfirmModal />
      <ReviewModal />
      <ItemEditModal />
      <ItemAddModal />
      <ProfileEditModal />
      <LoginModal />
      <CompareNoticeModal />
      <UnFollowModal />
    </>
  );
};

export default ModalProvider;
