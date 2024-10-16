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
        'primary-green': ' #54be96',
        'secondary-green': '#54BE9633',
      },
    },
  },
  plugins: [],
};
export default config;
