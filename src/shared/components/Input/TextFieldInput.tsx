type TextFieldInputProps = {
  value: string;
  placeholder: string;
};

const TextFieldInput: React.FC<TextFieldInputProps> = ({ placeholder }) => {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        className="placeholder-var-gray1::placeholder h-full w-full rounded-lg border-[1px] border-solid border-var-black3 bg-var-black2 p-2 text-var-white focus:border-[1px] focus:border-var-indigo focus:outline-none"
      />
    </div>
  );
};

export default TextFieldInput;
