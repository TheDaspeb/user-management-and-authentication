import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const variantStyles = {
  primary: 'bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white shadow-glow hover:shadow-cyber border border-primary-500/30',
  secondary: 'bg-gradient-to-r from-cyber-600 to-primary-600 hover:from-cyber-700 hover:to-primary-700 text-white shadow-glow-cyan border border-cyber-500/30',
  outline: 'bg-transparent border-2 border-primary-500 text-primary-400 hover:bg-primary-950/50 hover:border-primary-400',
  ghost: 'bg-transparent hover:bg-dark-800/50 text-dark-200 hover:text-white border border-dark-700/50 hover:border-dark-600',
  danger: 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl border border-red-500/30',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-4 py-2.5 text-base rounded-xl',
  lg: 'px-6 py-3 text-lg rounded-xl',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-950 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
