import { ButtonHTMLAttributes, memo } from 'react';
import Spinner from '../Spinner/Spinner';

type Variant = 'primary' | 'secondary' | 'tertiary';

const buttonColorList = {
  primary: {
    button: 'gradient-button hover:animate-bg-gradient',
    span: 'text-var-white',
  },
  secondary: {
    button: 'border-gradient-custom hover:animate-border-gradient',
    span: 'bg-clip-text text-transparent bg-gradient-custom',
  },
  tertiary: {
    button: 'border border-var-gray2 hover:border-var-indigo',
    span: 'text-var-gray2 group-hover:text-var-indigo',
  },
  primaryDisabled: {
    button: 'bg-[#353542]',
    span: 'text-[#6E6E82]',
  },
  secondaryDisabled: {
    button: 'border border-[#353542]',
    span: 'text-[#4c4c6d]',
  },
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: Variant;
  isPending?: boolean;
}

const Button = ({
  text,
  variant = 'primary',
  className,
  disabled,
  isPending,
  ...props
}: ButtonProps) => {
  let variants: keyof typeof buttonColorList;
  if (disabled || isPending) {
    variants = variant === 'primary' ? 'primaryDisabled' : 'secondaryDisabled';
  } else {
    variants = variant;
  }
  return (
    <button
      type="button"
      className={`${className || ''} group w-full rounded-[8px] py-[16px] text-[16px] font-bold transition-all duration-300 md:py-[22px] md:text-[16px] xl:py-[22px] xl:text-[18px] ${buttonColorList[variants].button}`}
      disabled={disabled || isPending}
      {...props}
    >
      {isPending ? (
        <Spinner isLoading />
      ) : (
        <span className={`${buttonColorList[variants].span}`}>{text}</span>
      )}
    </button>
  );
};

export default memo(Button);
