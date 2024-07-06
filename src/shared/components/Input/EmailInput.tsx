import { IAuthForm } from '@/pages/signup';
import { InputHTMLAttributes } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface EmailInputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<IAuthForm>;
  error?: FieldErrors;
}

const EmailInput: React.FC<EmailInputProps> = ({
  register,
  error,
  ...props
}) => {
  return (
    <div>
      <h1 className="pb-3 text-[16px] text-var-white">이메일</h1>
      <input
        type="email"
        className={`${error?.email && 'border-var-red'} placeholder-var-gray1::placeholder w-full rounded-lg border border-var-black3 bg-var-black2 px-[20px] py-[26px] text-var-white outline-none focus:border-gradient-custom`}
        {...register('email', { required: true })}
        {...props}
      />
      <span className="mt-[12px] block text-var-red">
        {error?.email && '이메일은 필수 입력 값 입니다.'}
      </span>
    </div>
  );
};

export default EmailInput;
