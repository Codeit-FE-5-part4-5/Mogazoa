import React, { useState } from 'react';

type TextAreaInputProps = {
  placeholder: string;
};

const TextAreaInput: React.FC<TextAreaInputProps> = ({ placeholder }) => {
  const [text, setText] = useState('');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div className="flex h-[120px] w-[295px] flex-col items-end md:w-[370px] lg:w-[400px]">
      <textarea
        placeholder={placeholder}
        maxLength={300}
        value={text}
        onChange={handleTextChange}
        className="h-full w-full rounded-lg border-[1px] border-solid border-var-black3 bg-var-black2 p-4 text-var-white placeholder-var-gray1 focus:border-[1px] focus:border-var-indigo focus:outline-none"
      />
      <div className="text-sm text-var-gray2">{text.length}/300</div>
    </div>
  );
};

export default TextAreaInput;
