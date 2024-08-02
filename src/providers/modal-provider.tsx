import { useEffect, useState } from 'react';
import CompareConfirmModal from '@/components/shared/modals/compare-confirm-modal';
import ReviewModal from '@/components/shared/modals/review-modal';
import ItemEditModal from '@/components/shared/modals/item-edit-modal';
import ItemAddModal from '@/components/shared/modals/item-add-modal';
import LoginModal from '@/components/shared/modals/login-modal';
import CompareNoticeModal from '@/components/shared/modals/compare-notice-modal';
import FollowModal from '@/components/shared/modals/follow-modal';
import FollowingModal from '@/components/shared/modals/following-modal';
import ProfileEditModal from '@/components/shared/modals/profile-edit-modal';

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
    </>
  );
};

export default ModalProvider;
