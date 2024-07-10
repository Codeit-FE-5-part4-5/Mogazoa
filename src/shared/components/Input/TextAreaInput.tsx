import React from 'react';

type TextAreaInputProps = {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="flex h-full w-full flex-col items-end rounded-lg border-[1px] border-solid border-var-black3 bg-var-black2 p-4 text-var-white focus-within:border-var-indigo">
      <textarea
        placeholder={placeholder}
        maxLength={500}
        value={value}
        onChange={onChange}
        className="h-full w-full resize-none bg-var-black2 placeholder-var-gray1 outline-none"
      />
      <div className="text-sm text-var-gray2">{value.length}/500</div>
    </div>
  );
};

export default TextAreaInput;
