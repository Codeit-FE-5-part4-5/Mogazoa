import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useToast } from '@/components/ui/use-toast';
import useModal from '@/shared/store/use-modal-store';
import useGetMe from '@/shared/models/auth/useGetMe';
import useUpdateProfile from '@/shared/models/user/profile/useUpdateProfile';
import ImageInput from '../Input/ImageInput';
import TextAreaInput from '../Input/TextAreaInput';
import Button from '../Button/Button';
import TextFieldInput from '../Input/TextFieldInput';

const ProfileEditModal = () => {
  const { toast } = useToast();
  const { isOpen, onClose, type } = useModal();

  const [nickname, setNickname] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    nickname?: string;
  }>({});

  const { mutateAsync, isPending: isUpdatePending } = useUpdateProfile();

  const { data: me } = useGetMe();

  const isModalOpen = isOpen && type === 'profileEdit';

  const handleSaveButton = async () => {
    if (!nickname) {
      setErrors((prev) => ({ ...prev, nickname: '닉네임은 필수 입력입니다.' }));
      return;
    }
    if (nickname.length > 10) {
      setErrors((prev) => ({
        ...prev,
        nickname: '닉네임은 최대 10자까지 가능합니다.',
      }));
      return;
    }
    if (!image) {
      toast({
        variant: 'destructive',
        title: '이미지를 추가해 주세요.',
      });
      return;
    }

    try {
      await mutateAsync({
        nickname,
        description,
        image: image ?? '',
      });
      onClose();
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      setErrors((prev) => ({
        ...prev,
        nickname: axiosError?.response?.data?.message,
      }));
    }
  };

  const handleNicknameBlur = () => {
    if (!nickname) {
      setErrors((prev) => ({ ...prev, nickname: '닉네임은 필수 입력입니다.' }));
    } else if (nickname.length > 10) {
      setErrors((prev) => ({
        ...prev,
        nickname: '닉네임은 최대 10자까지 가능합니다.',
      }));
    } else {
      setErrors((prev) => ({ ...prev, nickname: '' }));
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      setNickname(me?.nickname || '');
      setDescription(me?.description || '');
      setImage(me?.image || '');
      setErrors({});
    } else {
      setNickname('');
      setDescription('');
      setImage(null);
      setErrors({});
    }
  }, [isModalOpen, me]);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="mx-auto w-full max-w-[calc(100%-40px)] bg-[#1c1c22] text-var-white md:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="mb-10 self-start text-2xl">
            프로필 편집
          </DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <div className="flex flex-col gap-y-5 text-center">
          <div className="flex flex-col md:flex-row md:items-start">
            <div className="h-[160px] w-[160px]">
              <ImageInput onChange={setImage} initialImageUrl={me?.image} />
            </div>
          </div>
          <div className="flex w-full flex-col">
            <TextFieldInput
              placeholder="닉네임을 입력해 주세요."
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              onBlur={handleNicknameBlur}
            />
            {errors.nickname && (
              <div className="mt-2 self-start text-rose-500">
                {errors.nickname}
              </div>
            )}
          </div>
          <div className="flex h-[120px] flex-col items-end rounded-md bg-[#252530] md:h-[160px]">
            <TextAreaInput
              placeholder="수정할 내용을 입력해 주세요."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              textLength={300}
            />
          </div>
          <Button
            className={`${isUpdatePending ? 'opacity-80' : ''}`}
            text="저장하기"
            onClick={handleSaveButton}
            type="submit"
            isPending={isUpdatePending}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditModal;
