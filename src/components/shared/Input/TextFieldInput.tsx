import React, { InputHTMLAttributes } from 'react';

const TextFieldInput: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
  placeholder,
  value,
  onChange,
  onBlur,
}) => {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="h-full w-full rounded-lg border border-var-black3 bg-var-black2 p-5 text-var-white placeholder-var-gray1 outline-none transition-all duration-300 hover:bg-[#17171c] hover:border-gradient-custom focus:border-gradient-custom xl:h-[70px]"
      />
    </div>
  );
};

export default TextFieldInput;
