import { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`w-full px-4 py-3 rounded-xl bg-dark-900/50 backdrop-blur border border-dark-700/50 text-white placeholder:text-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-dark-900/80 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    />
  );
}
