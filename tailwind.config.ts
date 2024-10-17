import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-black': '#191A15',
        'primary-white': '#fbfbfb',
        'primary-orange': '#FC832C',
        'secondary-orange': '#FC832C33',
        'primary-blue': '#3470ff',
        'secondary-blue': '#3470FF33',
        'primary-green': '#54be96',
        'secondary-green': '#54BE9633',
        yellow: '#fbc75e',
        violet: '#4535AF',
      },
    },
    safelist: [
      'scale-150',
      'text-primary-orange',
      'text-primary-green',
      'text-primary-blue',
    ],
    lineHeight: {
      '102': '1.02',
      '133': '1.33',
    },
    letterSpacing: {
      '-0.02': '-0.02em',
    },
    backgroundImage: {
      'orange-gradient':
        'linear-gradient(138deg, rgba(255,255,255,1) 44%, rgba(252,131,44,1) 100%)',
      'blue-gradient':
        'linear-gradient(138deg, rgba(255,255,255,1) 44%, rgba(52,112,255,1) 100%)',
      'green-gradient':
        'linear-gradient(138deg, rgba(255,255,255,1) 44%, rgba(84,190,150,0.5999649859943977) 100%)',
    },
  },
  plugins: [],
};
export default config;
