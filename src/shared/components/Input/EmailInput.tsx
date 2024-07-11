import { InputHTMLAttributes } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface EmailInputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn;
  error?: FieldError;
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
        className={`${error && 'border-var-red'} placeholder-var-gray1::placeholder w-full rounded-lg border border-var-black3 bg-var-black2 px-[20px] py-[26px] text-var-white outline-none transition-all duration-300 hover:bg-[#17171C] focus:border-gradient-custom`}
        {...register}
        {...props}
      />
      <span className="mt-[12px] block text-[14px] text-var-red">
        {error && error.message}
      </span>
    </div>
  );
};

export default EmailInput;
