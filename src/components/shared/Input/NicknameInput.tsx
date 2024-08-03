import { InputHTMLAttributes } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { cn } from '@/lib/cn';

interface NicknameInputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const NicknameInput: React.FC<NicknameInputProps> = ({
  register,
  error,
  placeholder,
}: NicknameInputProps) => {
  return (
    <div>
      <h1 className="pb-3 text-[16px] text-var-white">닉네임</h1>
      <input
        type="text"
        maxLength={20}
        placeholder={placeholder}
        className={cn(
          'w-full rounded-lg border border-var-black3 bg-var-black2 px-[20px] py-[26px] text-var-white placeholder-var-gray1 outline-none transition-all duration-300 hover:bg-[#17171C] hover:border-gradient-custom focus:border-gradient-custom',
          error && 'border-var-red',
        )}
        {...register}
      />
      <span
        className={cn(
          'mt-[12px] block text-[14px]',
          error ? 'text-var-red' : 'text-var-gray1',
        )}
      >
        {error ? error.message : '최대 20자 가능'}
      </span>
    </div>
  );
};

export default NicknameInput;
