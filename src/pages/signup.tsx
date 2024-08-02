import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { signUpSchema } from '@/lib/validators/authValidator';
import useSignUp from '@/models/auth/useSignUp';

import MogazoaLayout from '@/components/layout/App/MogazoaLayout';
import {
  Button,
  EmailInput,
  NicknameInput,
  PasswordInput,
} from '@/components/shared';

export interface IAuthForm {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

const SignUp = () => {
  const { mutate } = useSignUp();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthForm>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
  });

  const handleSubmitSignUp = (data: IAuthForm) => {
    mutate(data, {
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          if (error.response?.data?.details?.email !== undefined) {
            setError('email', {
              type: 'validateError',
              message: error?.response?.data?.message,
            });
          } else if (error.response?.data?.details?.nickname !== undefined) {
            setError('nickname', {
              type: 'validateError',
              message: error?.response?.data?.message,
            });
          }
        }
      },
    });
  };

  return (
    <MogazoaLayout>
      <div className="flex items-center justify-center px-[20px] py-[80px]">
        <form
          onSubmit={handleSubmit(handleSubmitSignUp)}
          className="flex w-full flex-col gap-[40px] md:w-[440px] xl:w-[640px]"
        >
          <EmailInput
            register={register('email')}
            error={errors.email}
            placeholder="이메일을 입력해 주세요"
          />
          <NicknameInput
            register={register('nickname')}
            error={errors.nickname}
            placeholder="닉네임을 입력해 주세요"
          />
          <PasswordInput
            register={register('password')}
            error={errors.password}
            placeholder="비밀번호를 입력해 주세요"
          />
          <PasswordInput
            register={register('passwordConfirmation')}
            error={errors.passwordConfirmation}
            placeholder="비밀번호를 한번 더 입력해 주세요"
          />
          <Button text="가입하기" type="submit" className="mt-[20px]" />
        </form>
      </div>
    </MogazoaLayout>
  );
};

export default SignUp;
