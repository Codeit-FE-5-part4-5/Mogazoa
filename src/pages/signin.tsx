import Button from '@/shared/components/Button/Button';
import EmailInput from '@/shared/components/Input/EmailInput';
import PasswordInput from '@/shared/components/Input/PasswordInput';
import useInput from '@/shared/hooks/useInput';
import useSignIn from '@/shared/models/auth/useSignIn';
import { zodResolver } from '@hookform/resolvers/zod';
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
    mutate(data, {
      onSuccess: (data) => console.log(data),
      onError: (error) => console.log(error),
    });
  };

  return (
    <div className="flex h-dvh items-center justify-center">
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
        <Button text="로그인하기" type="submit" className="mt-[20px]" />
      </form>
    </div>
  );
}
