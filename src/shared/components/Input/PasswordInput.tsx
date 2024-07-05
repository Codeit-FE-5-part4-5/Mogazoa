import { useState } from 'react';
import Image from 'next/image';

type PasswordInputProps = {
  value: string;
  placeholder: string;
};

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  placeholder,
}) => {
  const [inputType, setInputType] = useState(true);
  const [icon, setIcon] = useState('/images/PasswordShow.png');
  const handleShowClick = () => {
    setInputType(!inputType);
    if (inputType) {
      setIcon('/images/PasswordHide.png');
    } else {
      setIcon('/images/PasswordShow.png');
    }
  };

  return (
    <div>
      <h1 className="pb-3 text-[16px] text-var-white">비밀번호</h1>
      <div className="flex h-full w-full justify-between rounded-lg border-[1px] border-solid border-var-black3 bg-var-black2 pr-2 focus-within:border-var-indigo">
        <input
          value={value}
          type={inputType ? 'password' : 'text'}
          placeholder={placeholder}
          className="placeholder-var-gray1::placeholder h-full w-full rounded-lg bg-var-black2 px-2 text-var-white focus:outline-none"
        />
        <button
          onClick={handleShowClick}
          className="flex items-center justify-center"
        >
          <Image src={icon} width={22} height={22} alt="logo" />
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
