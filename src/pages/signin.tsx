import Button from '@/shared/components/Button/Button';
import EmailInput from '@/shared/components/Input/EmailInput';
import PasswordInput from '@/shared/components/Input/PasswordInput';
import useInput from '@/shared/hooks/useInput';
import useSignIn from '@/shared/models/auth/useSignIn';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

export interface IAuthForm {
  email: '';
  password: '';
}

export default function SignIn() {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const { mutate } = useSignIn();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IAuthForm>({
    mode: 'onBlur',
  });

  const handleSubmitSignIn = () => {
    mutate(
      { email, password },
      {
        onSuccess: (data) => console.log(data),
        onError: (error) => console.log(error),
      },
    );
  };

  return (
    <div className="flex h-dvh items-center justify-center">
      <form
        onSubmit={handleSubmit(handleSubmitSignIn)}
        className="flex w-full flex-col gap-[40px] md:w-[440px] xl:w-[640px]"
      >
        <EmailInput
          register={register}
          error={errors}
          value={email}
          placeholder="이메일을 입력해 주세요"
          onChange={onChangeEmail}
        />
        <PasswordInput
          register={register}
          error={errors}
          value={password}
          onChange={onChangePassword}
          placeholder="비밀번호를 입력해 주세요"
        />
        <Button text="로그인하기" type="submit" className="mt-[20px]" />
      </form>
    </div>
  );
}
