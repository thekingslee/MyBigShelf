/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
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
        custom: {
          'aqua-200': 'hsl(var(--aqua-200))',
          'text-body': 'hsl(var(--text-body))',
          'text-primary': 'hsl(var(--text-primary))',
          'text-secondary': 'hsl(var(--text-secondary))',
          'black-20': 'hsl(var(--black-20))',
          'black-20-light': 'hsla(var(--black-20-light))',
          'black-50': 'hsl(var(--black-50))',
          'black-100': 'hsl(var(--black-100))',
          'black-200': 'hsl(var(--black-200))',
          'black-300': 'hsl(var(--black-300))',
          'black-400': 'hsl(var(--black-400))',
          'black-500': 'hsl(var(--black-500))',
          'black-900': 'hsl(var(--black-900))',
          'badge-text': 'hsl(var(--badge-text))',
          darkest: 'hsl(var(--darkest))',
          error: 'hsl(var(--error))',
          'error-100': 'hsl(var(--error-100))',
          'error-200': 'hsl(var(--error-200))',
          'error-300': 'hsl(var(--error-300))',
          'gray-500': 'hsl(var(--gray-500))',
          info: {
            DEFAULT: 'hsl(var(--info))',
            light: 'hsl(var(--info-light))',
            100: 'hsl(var(--info-100))',
          },
          success: {
            DEFAULT: 'hsl(var(--success))',
            light: 'hsl(var(--success-light))',
            100: 'hsl(var(--success-100))',
          },
          'card-hover': 'hsl(var(--card-hover))',
          secondary: 'hsl(var(--secondary))',
          'header-bg': 'hsl(var(--header-bg))',
          'benefit-bg': 'hsl(var(--benefit-bg))',
          'statistic-bg': 'hsl(var(--statistic-bg))',
          'testimonial-bg': 'hsl(var(--testimonial-bg))',
          'testimonial-card-bg': 'hsl(var(--testimonial-card-bg))',
          'testimonial-card-border': 'hsl(var(--testimonial-card-border))',
          'affiliate-bg': 'hsl(var(--affiliate-bg))',
          'credit-green': 'hsl(var(--credit-green))',
          'green-100': 'hsl(var(--green-100))',
          'green-200': 'hsl(var(--green-200))',
          'green-300': 'hsl(var(--green-300))',
          'warning-100': 'hsl(var(--warning-100))',
          warning: 'hsl(var(--warning))',
          cart: 'hsl(var(--cart))',
          'cart-tray': 'hsl(var(--cart-tray))',
          'brand-bg-3': 'hsl(var(--brand-bg-3))',
          'drawer-close-bg': 'hsl(var(--drawer-close-bg))',
          'yellow-300': 'hsl(var(--yellow-300))',
          'brand-outline2': 'hsl(var(brand-outline2))',
        },
      },
      fontFamily: {
        headingFont: '"Playfair Display", serif',
        poppinsFont: '"Poppins", sans-serif',
        interFont: '"Inter", sans-serif',
        bodyRegularFont: '"Satoshi-Regular", serif',
        bodyMediumFont: '"Satoshi-Medium", serif',
        bodyBoldFont: '"Satoshi-Bold", serif',
      },
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(95deg, rgba(255,238,234,1) 0%, rgba(255,255,255,1) 78%, rgba(194,255,255,1) 100%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      blur: {
        custom: '20px',
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
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fadeIn 0.3s ease-in-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
