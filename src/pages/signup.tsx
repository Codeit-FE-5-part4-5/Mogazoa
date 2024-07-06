import Button from '@/shared/components/Button/Button';
import EmailInput from '@/shared/components/Input/EmailInput';
import NicknameInput from '@/shared/components/Input/NicknameInput';
import PasswordInput from '@/shared/components/Input/PasswordInput';
import useInput from '@/shared/hooks/useInput';
import useSignUp from '@/shared/models/auth/useSignUp';
import { useForm } from 'react-hook-form';

export interface IAuthForm {
  email: '';
  nickname: '';
  password: '';
  passwordConfirmation: '';
}

export default function SignUp() {
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordConfirmation, onChangePasswordConfirmation] = useInput('');
  const { mutate } = useSignUp();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IAuthForm>({
    mode: 'onBlur',
  });

  const handleSubmitSignUp = () => {
    mutate(
      { email, nickname, password, passwordConfirmation },
      {
        onSuccess: (data) => console.log(data),
        onError: (error) => console.log(error),
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitSignUp)}
      className="flex flex-col gap-[40px] md:w-[440px] xl:w-[640px]"
    >
      <EmailInput
        register={register}
        error={errors}
        value={email}
        placeholder="이메일을 입력해 주세요"
        onChange={onChangeEmail}
      />
      <NicknameInput
        register={register}
        error={errors}
        value={nickname}
        onChange={onChangeNickname}
        placeholder="닉네임을 입력해 주세요"
      />
      <PasswordInput
        register={register}
        error={errors}
        value={password}
        onChange={onChangePassword}
        placeholder="비밀번호를 입력해 주세요"
      />
      <PasswordInput
        register={register}
        error={errors}
        value={passwordConfirmation}
        onChange={onChangePasswordConfirmation}
        placeholder="비밀번호를 한번 더 입력해 주세요"
      />
      <Button text="가입하기" type="submit" className="mt-[20px]" />
    </form>
  );
}
