import { IAuthForm } from '@/pages/signup';
import { InputHTMLAttributes } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface NicknameInputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<IAuthForm>;
  error?: FieldErrors;
}

const NicknameInput: React.FC<NicknameInputProps> = ({
  register,
  error,
  ...props
}) => {
  return (
    <div>
      <h1 className="pb-3 text-[16px] text-var-white">닉네임</h1>
      <input
        type="text"
        maxLength={10}
        className={`${error?.nickname && 'border-var-red'} placeholder-var-gray1::placeholder w-full rounded-lg border border-var-black3 bg-var-black2 px-[20px] py-[26px] text-var-white outline-none focus:border-gradient-custom`}
        {...register('nickname', { required: true })}
        {...props}
      />
      <span className="mt-3 block text-var-red">
        {error?.nickname ? '닉네임은 필수 입력 값 입니다.' : '최대 10자 가능'}
      </span>
    </div>
  );
};

export default NicknameInput;
