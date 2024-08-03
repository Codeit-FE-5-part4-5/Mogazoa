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
        className="placeholder-var-gray1::placeholder h-full w-full rounded-lg border-[1px] border-solid border-var-black3 bg-var-black2 p-5 text-var-white focus:border-[1px] focus:border-var-indigo focus:outline-none"
      />
    </div>
  );
};

export default TextFieldInput;
