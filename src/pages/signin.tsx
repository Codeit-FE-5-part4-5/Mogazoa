import MogazoaLayout from '@/shared/components/App/MogazoaLayout';
import Button from '@/shared/components/Button/Button';
import EmailInput from '@/shared/components/Input/EmailInput';
import PasswordInput from '@/shared/components/Input/PasswordInput';
import useSignIn from '@/shared/models/auth/useSignIn';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export interface ILoginForm {
  email: '';
  password: '';
}

const signInSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해 주세요.')
    .email('올바른 이메일 주소가 아닙니다.'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
});

export default function SignIn() {
  const { mutate } = useSignIn();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginForm>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
  });

  const handleSubmitSignIn = (data: ILoginForm) => {
    mutate(data);
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
              <div className="flex size-[56px] cursor-pointer items-center justify-center rounded-[50%] border border-var-black3">
                <Image
                  src="/google.svg"
                  alt="구글 로그인"
                  width={28}
                  height={28}
                />
              </div>
              <div className="flex size-[56px] cursor-pointer items-center justify-center rounded-[50%] border border-var-black3">
                <Image
                  src="/kakao.svg"
                  alt="카카오 로그인"
                  width={28}
                  height={28}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </MogazoaLayout>
  );
}
