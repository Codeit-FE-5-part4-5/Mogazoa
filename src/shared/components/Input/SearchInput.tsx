import { InputHTMLAttributes } from 'react';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function SearchInput({ className, ...props }: SearchInputProps) {
  const classNames = className;
  return (
    <input
      className={`${classNames ? classNames : ''} flex size-full flex-col items-start justify-center gap-[10px] rounded-[28px] border border-var-black3 bg-[#252530] p-[16px_20px] text-white outline-none focus:border-gradient-custom md:w-[300px] xl:w-[400px]`}
      {...props}
    />
  );
}
