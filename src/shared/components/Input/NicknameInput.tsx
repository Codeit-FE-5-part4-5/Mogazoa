import { InputHTMLAttributes } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface NicknameInputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn;
  error?: FieldError;
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
        className={`${error && 'border-var-red'} placeholder-var-gray1::placeholder w-full rounded-lg border border-var-black3 bg-var-black2 px-[20px] py-[26px] text-var-white outline-none focus:border-gradient-custom`}
        {...register}
        {...props}
      />
      <span
        className={`mt-[12px] block text-[14px] ${error ? 'text-var-red' : 'text-var-gray1'}`}
      >
        {error ? error.message : '최대 10자 가능'}
      </span>
    </div>
  );
};

export default NicknameInput;
