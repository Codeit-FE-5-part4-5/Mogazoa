import { InputHTMLAttributes } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { cn } from '@/lib/cn';

interface EmailInputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const EmailInput: React.FC<EmailInputProps> = ({
  register,
  error,
  placeholder,
}: EmailInputProps) => {
  return (
    <div>
      <h1 className="pb-3 text-[16px] text-var-white">이메일</h1>
      <input
        type="email"
        placeholder={placeholder}
        className={cn(
          'w-full rounded-lg border border-var-black3 bg-var-black2 px-[20px] py-[26px] text-var-white placeholder-var-gray1 outline-none transition-all duration-300 hover:bg-[#17171C] hover:border-gradient-custom focus:border-gradient-custom',
          error && 'border-var-red',
        )}
        {...register}
      />
      <span className="mt-[12px] block text-[14px] text-var-red">
        {error && error.message}
      </span>
    </div>
  );
};

export default EmailInput;
