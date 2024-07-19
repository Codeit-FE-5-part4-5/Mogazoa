import { InputHTMLAttributes, useState } from 'react';
import Image from 'next/image';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  register,
  error,
  placeholder,
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
          placeholder={placeholder}
          className={`${error && 'border-var-red'} placeholder-var-gray1::placeholder w-full rounded-lg border border-var-black3 bg-var-black2 px-[20px] py-[26px] text-var-white outline-none transition-all duration-300 hover:bg-[#17171C] focus:border-gradient-custom`}
          {...register}
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
        className={`mt-[12px] block text-[14px] ${error ? 'text-var-red' : 'text-var-gray1'}`}
      >
        {error ? error.message : '최소 8자 이상'}
      </span>
    </div>
  );
};

export default PasswordInput;
