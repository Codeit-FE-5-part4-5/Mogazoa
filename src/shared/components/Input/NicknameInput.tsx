type NicknameInputProps = {
  value: string;
  placeholder: string;
};

const NicknameInput: React.FC<NicknameInputProps> = ({ placeholder }) => {
  return (
    <div>
      <h1 className="pb-3 text-[16px] text-var-white">닉네임</h1>

      <input
        type="text"
        maxLength="10"
        placeholder={placeholder}
        className="placeholder-var-gray1::placeholder h-[70px] w-[335px] rounded-lg border-[1px] border-solid border-var-black3 bg-var-black2 p-2 text-var-white focus:border-[1px] focus:border-var-indigo focus:outline-none md:w-[440px] lg:w-[640px]"
      />
    </div>
  );
};

export default NicknameInput;
