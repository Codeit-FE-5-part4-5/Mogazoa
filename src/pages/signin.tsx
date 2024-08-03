import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { signInSchema } from '@/lib/validators/authValidator';
import useSignIn from '@/models/queries/auth/useSignIn';

import MogazoaLayout from '@/components/layout/App/MogazoaLayout';
import GoogleButton from '@/components/feature/auth/GoogleButton/GoogleButton';
import KakaoButton from '@/components/feature/auth/KakaoButton/KakaoButton';
import { Button, EmailInput, PasswordInput } from '@/components/shared';

export interface ILoginForm {
  email: string;
  password: string;
}

const SignIn = () => {
  const { mutate } = useSignIn();
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginForm>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
  });

  const handleSubmitSignIn = async (data: ILoginForm) => {
    mutate(data, {
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          if (error.response?.data?.details?.email !== undefined) {
            setError('email', {
              type: 'validateError',
              message: error?.response?.data?.message,
            });
          } else if (error.response?.data?.details?.password !== undefined) {
            setError('password', {
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
      <div className="flex items-center justify-center px-[20px] py-[100px]">
        <form
          onSubmit={handleSubmit(handleSubmitSignIn)}
          className="flex w-full flex-col gap-[40px] md:w-[440px] xl:w-[640px]"
        >
          <EmailInput
            register={register('email')}
            error={errors.email}
            placeholder="이메일을 입력해 주세요"
          />
          <PasswordInput
            register={register('password')}
            error={errors.password}
            placeholder="비밀번호를 입력해 주세요"
          />
          <div className="mt-[20px] flex flex-col gap-[4px]">
            <Button text="로그인하기" type="submit" />
            <Link href="/signup">
              <Button
                text="회원가입 하러가기"
                variant="secondary"
                type="button"
                className="mt-[20px]"
              />
            </Link>
          </div>
          <div className="mt-[20px] flex flex-col items-center justify-center gap-[20px]">
            <h3 className="text-var-gray1">SNS로 바로 시작하기</h3>
            <div className="flex gap-[20px]">
              <GoogleButton>
                <Image
                  src="/google.svg"
                  alt="구글 로그인"
                  width={28}
                  height={28}
                />
              </GoogleButton>
              <KakaoButton>
                <Image
                  src="/kakao.svg"
                  alt="카카오 로그인"
                  width={28}
                  height={28}
                />
              </KakaoButton>
            </div>
          </div>
        </form>
      </div>
    </MogazoaLayout>
  );
};

export default SignIn;
