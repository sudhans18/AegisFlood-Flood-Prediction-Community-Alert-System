import { ChangeEvent } from 'react'

type InputProps = {
  type?: string
  placeholder?: string
  value?: string | number
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export default function Input({ type = 'text', placeholder, value, onChange, className = '' }: InputProps) {
  const base = 'w-full px-3 py-2 border border-border-gray rounded-md focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue'
  return (
    <input type={type} placeholder={placeholder} value={value as any} onChange={onChange} className={`${base} ${className}`} />
  )
}




