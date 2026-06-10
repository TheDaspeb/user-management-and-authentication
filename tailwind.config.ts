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
        primary: { 600: '#0284c7', 700: '#0369a1', 500: '#0ea5e9' },
        accent: { 600: '#7c3aed', 700: '#6d28d9' },
        cyber: { 600: '#0d9488', 700: '#0f766e' },
        dark: { 50: '#f8fafc', 200: '#e2e8f0', 400: '#94a3b8', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a', 950: '#020617' },
      },
      backgroundImage: {
        'gradient-cyber': 'linear-gradient(135deg, #0369a1 0%, #7c3aed 50%, #0f766e 100%)',
        'gradient-auth': 'linear-gradient(135deg, #0c3d66 0%, #1e1b4b 50%, #134e4a 100%)',
      },
      boxShadow: {
        glow: '0 0 20px rgba(3, 105, 161, 0.3)',
        cyber: '0 0 30px rgba(3, 105, 161, 0.4), 0 0 60px rgba(124, 58, 237, 0.2)',
      },
    },
  },
  plugins: [],
};

export default config;
