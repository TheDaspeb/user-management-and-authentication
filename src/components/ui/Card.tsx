import { HTMLAttributes, ReactNode } from 'react';

type CardVariant = 'default' | 'elevated' | 'filled' | 'outline';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: CardVariant;
}

const variantStyles = {
  default: 'bg-dark-900/40 backdrop-blur border border-dark-700/50 shadow-lg hover:shadow-xl',
  elevated: 'bg-gradient-to-br from-dark-800 to-dark-900 border border-primary-500/20 shadow-cyber',
  filled: 'bg-dark-800/60 backdrop-blur-md border border-dark-600/50 shadow-lg',
  outline: 'bg-transparent border-2 border-primary-500/30 hover:border-primary-500/60',
};

export function Card({
  children,
  variant = 'default',
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      className={`rounded-2xl p-6 transition-all duration-200 ${variantStyles[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
