import { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'tertiary';

const buttonColorList = {
  primary: {
    button:
      'bg-gradient-custom hover:bg-gradient-custom-hover hover:animate-gradient',
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
  variant?: Variant;
}

const Button = ({
  text,
  variant = 'primary',
  className,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={`${className ? `${className}` : ''} w-full rounded-[8px] py-[16px] text-[16px] font-bold transition-transform duration-300 md:py-[22px] md:text-[16px] xl:py-[22px] xl:text-[18px] ${buttonColorList[variant].button}`}
      disabled={disabled}
      {...props}
    >
      <span className={`${buttonColorList[variant].span}`}>{text}</span>
    </button>
  );
};

export default Button;
