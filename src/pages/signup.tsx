import Button from '@/shared/components/Button/Button';
import EmailInput from '@/shared/components/Input/EmailInput';
import NicknameInput from '@/shared/components/Input/NicknameInput';
import PasswordInput from '@/shared/components/Input/PasswordInput';
import useSignUp from '@/shared/models/auth/useSignUp';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Header } from '@/shared/components/header/header';

export interface IAuthForm {
  email: '';
  nickname: '';
  password: '';
  passwordConfirmation: '';
}

const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, '이메일을 입력해 주세요.')
      .email('올바른 이메일 주소가 아닙니다.'),
    nickname: z
      .string()
      .min(1, '닉네임을 입력해 주세요.')
      .max(10, '닉네임은 최대 10자 까지 가능합니다.'),
    password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
    passwordConfirmation: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirmation'],
  });

export default function SignUp() {
  const { mutate } = useSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthForm>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
  });

  const handleSubmitSignUp = (data: IAuthForm) => {
    mutate(data);
  };

  return (
    <>
      <Header />
      <div className="mt-[180px] flex items-center justify-center px-[20px]">
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
    </>
  );
}
