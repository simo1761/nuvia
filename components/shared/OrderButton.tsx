'use client';

interface OrderButtonProps {
  label?: string;
  targetId?: string;
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

export default function OrderButton({
  label = 'اطلبي الآن',
  targetId = 'checkout',
  href,
  size = 'md',
  fullWidth = false,
  className = '',
}: OrderButtonProps) {
  const sizeClasses = {
    sm: 'px-6 py-2.5 text-sm',
    md: 'px-8 py-3.5 text-base',
    lg: 'px-10 py-4 text-lg',
  };

  const handleClick = () => {
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  if (href) {
    return (
      <a
        href={href}
        className={`inline-flex items-center justify-center bg-gradient-to-r from-primary to-primary-dark text-white rounded-full font-bold shadow-gold hover:shadow-gold-lg transition-all duration-300 hover:-translate-y-0.5 animate-pulse-slow ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      >
        {label}
      </a>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center justify-center bg-gradient-to-r from-primary to-primary-dark text-white rounded-full font-bold shadow-gold hover:shadow-gold-lg transition-all duration-300 hover:-translate-y-0.5 animate-pulse-slow ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {label}
    </button>
  );
}
