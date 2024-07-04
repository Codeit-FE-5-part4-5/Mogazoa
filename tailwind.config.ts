import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-custom': 'linear-gradient(to right, #5097FA, #5363FF)',
      },
      colors: {
        'var-black1': '#17171C',
        'var-black2': '#21212A',
        'var-black3': '#2E2E3A',
        'var-blue': '#5097FA',
        'var-indigo': '#5363FF',
        'var-gray1': '#6E6E82',
        'var-gray2': '#9FA6B2',
        'var-white': '#F1F1F5',
        'var-yellow': '#FFC83C',
        'var-green': '#05D58B',
        'var-pink': '#FF2F9F',
        'var-red': '#FF0000',
      },
    },
  },
  plugins: [],
};

export default config;
