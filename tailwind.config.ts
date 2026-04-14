import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f4f1ea',
        paperDeep: '#ebe6db',
        ink: '#141210',
        inkSoft: '#3a362f',
        mute: '#8a8578',
        vermilion: '#c8301e',
        vermilionDeep: '#9a2315',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        stamp: '0.24em',
      },
    },
  },
  plugins: [],
};

export default config;
