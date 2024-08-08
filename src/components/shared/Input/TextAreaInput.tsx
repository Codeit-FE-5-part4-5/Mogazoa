import React, { TextareaHTMLAttributes } from 'react';

interface TextAreaInputProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  textLength: number;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  placeholder,
  value,
  textLength,
  onChange,
}) => {
  return (
    <label htmlFor="textArea" className="relative size-full">
      <textarea
        id="textArea"
        placeholder={placeholder}
        maxLength={textLength}
        value={value}
        onChange={onChange}
        className="size-full resize-none rounded-lg border border-var-black3 bg-var-black2 px-[20px] py-[20px] text-var-white placeholder-var-gray1 outline-none transition-all duration-300 hover:bg-[#17171c] hover:border-gradient-custom focus:border-gradient-custom"
      />
      <div className="absolute bottom-[8px] right-[12px] text-sm text-var-gray2">
        {typeof value === 'string' ? value?.length : 0}/{textLength}
      </div>
    </label>
  );
};

export default TextAreaInput;
