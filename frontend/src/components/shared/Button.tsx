import { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'link'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  disabled = false, 
  className = '', 
  type = 'button' 
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-md font-medium transition-colors'
  
  const variants: Record<string, string> = {
    primary: 'bg-dark-black text-white hover:bg-gray-800',
    secondary: 'bg-light-gray text-dark-gray hover:bg-gray-200',
    link: 'text-brand-blue hover:underline'
  }

  const sizes: Record<string, string> = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }

  const disabledCls = disabled ? 'opacity-50 cursor-not-allowed' : ''
  return (
    <button 
      type={type} 
      onClick={onClick} 
      disabled={disabled} 
      className={`${base} ${variants[variant]} ${sizes[size]} ${disabledCls} ${className}`}
    >
      {children}
    </button>
  )
}




