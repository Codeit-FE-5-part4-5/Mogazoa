import { ButtonHTMLAttributes } from 'react';

type Size = 's' | 'm' | 'l';
type Variant = 'primary' | 'secondary' | 'tertiary';

const buttonSizeList = {
  l: 'py-[22px] text-[18px]',
  m: 'py-[18px] text-[16px]',
  s: 'py-[16px] text-[16px]',
};

const buttonColorList = {
  primary: {
    button: 'bg-gradient-custom',
    span: 'text-var-white',
  },
  secondary: {
    button: 'border-gradient-custom',
    span: 'bg-clip-text text-transparent bg-gradient-custom',
  },
  tertiary: {
    button: 'border border-var-gray2 text-var-gray2',
    span: 'text-var-gray2',
  },
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  size?: Size;
  variant?: Variant;
}

export default function Button({
  text,
  size = 'm',
  variant = 'primary',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`w-full rounded-[8px] font-bold ${buttonSizeList[size]} ${buttonColorList[variant].button}`}
      disabled={disabled}
      {...props}
    >
      <span className={`${buttonColorList[variant].span}`}>{text}</span>
    </button>
  );
}
