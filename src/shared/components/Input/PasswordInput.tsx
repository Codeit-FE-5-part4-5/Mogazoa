import { InputHTMLAttributes, useState } from 'react';
import Image from 'next/image';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { IAuthForm } from '@/pages/signup';
import { ILoginForm } from '@/pages/signin';

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<IAuthForm | ILoginForm>;
  error?: FieldErrors;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  register,
  error,
  ...props
}) => {
  const [inputType, setInputType] = useState(true);
  const [icon, setIcon] = useState('/images/PasswordShow.png');
  const handleShowClick = () => {
    setInputType(!inputType);
    if (inputType) {
      setIcon('/images/PasswordHide.png');
    } else {
      setIcon('/images/PasswordShow.png');
    }
  };

  return (
    <div>
      <h1 className="pb-3 text-[16px] text-var-white">비밀번호</h1>
      <div className="relative">
        <input
          type={inputType ? 'password' : 'text'}
          className={`${error?.password && 'border-var-red'} placeholder-var-gray1::placeholder w-full rounded-lg border border-var-black3 bg-var-black2 px-[20px] py-[26px] text-var-white outline-none focus:border-gradient-custom`}
          {...register('password', { required: true })}
          {...props}
        />
        <button
          onClick={handleShowClick}
          type="button"
          className="absolute right-[20px] top-[50%] flex translate-y-[-11px] items-center justify-center"
        >
          <Image src={icon} width={22} height={22} alt="logo" />
        </button>
      </div>
      <span
        className={`mt-[12px] block text-[14px] ${error?.password ? 'text-var-red' : 'text-var-gray1'}`}
      >
        {error?.password ? '비밀번호는 필수 입력 값 입니다.' : '최소 8자 이상'}
      </span>
    </div>
  );
};

export default PasswordInput;
