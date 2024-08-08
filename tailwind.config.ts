// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-custom':
          'linear-gradient(to right, #5363FF 0%, #5097FA 50%, #5097FA 100%)',
        'dark-gradient-custom': 'linear-gradient(to right, #2e2e3a, #21212A)',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
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
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-10%)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '1', transform: 'translateY(0)' },
          to: { opacity: '0', transform: 'translateY(-10%)' },
        },
        slideRight: {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        slideLeft: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        bigger: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        smaller: {
          from: { width: '100%' },
          to: { width: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        bounceRight: {
          '0%, 100%': {
            transform: 'translateX(-25%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'none',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100%' },
        },
        pulseSlowly: {
          '50%': {
            opacity: '0.5',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        slideDown: 'slideDown 0.2s ease-in-out forwards',
        slideUp: 'slideUp 0.2s ease-in-out forwards',
        slideRight: 'slideRight 0.3s ease-in-out forwards',
        slideLeft: 'slideLeft 0.3s ease-in-out forwards',
        bigger: 'bigger 0.3s ease-in-out forwards',
        smaller: 'smaller 0.3s ease-in-out forwards',
        fadeIn: 'fadeIn 0.3s ease-in-out forwards',
        fadeOut: 'fadeOut 0.3s ease-in-out forwards',
        spin: 'spin 2s linear infinite',
        bounceRight: 'bounceRight 1s infinite',
        'bg-gradient': 'gradient 1s linear infinite',
        'border-gradient': 'gradient 1s linear infinite',
        pulseSlowly: 'pulseSlowly 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line global-require
    require('tailwindcss-animate'),
    plugin(function ({
      addUtilities,
    }: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      addUtilities: (utilities: Record<string, any>) => void;
    }) {
      addUtilities({
        '.border-gradient-custom': {
          border: '1px solid transparent',
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
          backgroundImage:
            'linear-gradient(#17171C, #17171C), linear-gradient(to right, #5363FF 0%, #5097FA 25%, #5097FA 50%, #5363FF 75%, #5097FA 100%)',
          backgroundSize: '400%',
        },
        '.gradient-button': {
          background:
            'linear-gradient(to right, #5097FA 0%, #5363FF 25%, #5363FF 50%, #5097FA 75%, #5363FF 100%)',
          backgroundSize: '400%',
        },
        '.disabled-gradient': {
          background:
            'linear-gradient(to right, #9FA6B2 0%, #6E6E82 25%, #6E6E82 50%, #9FA6B2 75%, #6E6E82 100%)',
          backgroundSize: '400%',
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE and Edge
        },
      });
    }),
  ],
};
