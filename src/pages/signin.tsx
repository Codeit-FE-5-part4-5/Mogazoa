import Link from 'next/link';
import MogazoaLayout from '@/shared/components/App/MogazoaLayout';
import Button from '@/shared/components/Button/Button';
import GoogleButton from '@/shared/components/OAuthButton/GoogleButton/GoogleButton';
import EmailInput from '@/shared/components/Input/EmailInput';
import PasswordInput from '@/shared/components/Input/PasswordInput';
import KakaoButton from '@/shared/components/OAuthButton/KakaoButton/KakaoButton';
import useSignIn from '@/shared/models/auth/useSignIn';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

export interface ILoginForm {
  email: string;
  password: string;
}

const signInSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해 주세요.')
    .email('올바른 이메일 주소가 아닙니다.'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
});

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
              <GoogleButton />
              <KakaoButton />
            </div>
          </div>
        </form>
      </div>
    </MogazoaLayout>
  );
};

export default SignIn;
